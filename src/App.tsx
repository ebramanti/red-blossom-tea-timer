import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, List, Pagination, Skeleton, Tabs } from "antd";
import { Duration } from "luxon";
import { BrewingPaneInfo } from "./components/BrewingPaneInfo";
import { BrewInstructions, Tea, TeaInfo, TeaType } from "./types";

export const DURATION_KEY_MAP = {
  sec: "seconds",
  secs: "seconds",
  min: "minutes",
  mins: "minutes",
} as const;

interface TeaPage {
  teas: Tea[];
  page: number;
  numberOfPages: number;
}

const isValidTea = (data: { [K in keyof Tea]: Tea[K] | null }): data is Tea => {
  return !!data.name && !!data.baseHref && !data.name.includes("Collection");
};

const getTeas = async (type: TeaType, page = 1): Promise<TeaPage> => {
  const response = await fetch(
    `https://redblossomtea.com/collections/${type}?page=${page}`
  );
  const text = await response.text();
  const doc = new DOMParser().parseFromString(text, "text/html");
  const [currentPage, numberOfPages] = doc
    .querySelector("li.position")
    ?.textContent?.match(/\d+/g)
    ?.map(Number) || [1, 1];

  const teas = Array.from(
    doc.querySelectorAll<HTMLAnchorElement>(
      "div.product-card-details > h2.title > a"
    )
  )
    .map((tag) => ({
      name: tag.textContent,
      baseHref: tag.getAttribute("href"),
    }))
    .filter(isValidTea);
  return {
    teas,
    numberOfPages,
    page: currentPage,
  };
};

const getTeaInfo = async (tea: Tea): Promise<TeaInfo> => {
  const response = await fetch(`https://redblossomtea.com${tea.baseHref}`);
  const text = await response.text();
  const doc = new DOMParser().parseFromString(text, "text/html");
  const brewingGuideContent = doc.getElementsByClassName("tabs-content")[0]
    ?.lastElementChild;
  if (brewingGuideContent) {
    const description = Array.from(
      brewingGuideContent.getElementsByTagName("p")
    )
      .map((tag) => tag.textContent)
      .join("\n");
    const brewingInfoContent = doc
      .querySelector("h3 ~ table:last-of-type")
      ?.querySelectorAll("tbody.screen-large > tr > td");
    let brewingInfo: BrewInstructions[] = [];
    if (brewingInfoContent) {
      brewingInfo = Array.from(brewingInfoContent).map((element) => {
        let children = Array.from(element.children);
        const isInfuserType = children.length === 1;
        if (isInfuserType) {
          children = Array.from(
            children[0].querySelectorAll('[class^="brew"]')
          );
        }
        const [, typeElement, dataElement] = children;
        const type = typeElement?.textContent ?? "";
        const isNestedDataElement = isInfuserType || type === "Tea Bowl";
        const dataElementSelector = isNestedDataElement
          ? "span.data-data, span > span:last-child > span"
          : "span.data-data, span:last-child > span";
        const [leafText, temperatureText, durationText] = Array.from(
          dataElement.querySelectorAll<HTMLSpanElement>(dataElementSelector)
        ).map((element) => element.textContent || "");
        let duration: Duration | undefined;
        if (durationText) {
          const [rawValue, timeAmount] = durationText.split(" ");
          duration = Duration.fromObject({
            [DURATION_KEY_MAP[
              timeAmount as keyof typeof DURATION_KEY_MAP
            ]]: rawValue,
          });
        }
        return {
          type,
          leafAmount: leafText,
          temperature: temperatureText,
          duration,
        };
      });
    }
    return {
      name: tea.name,
      description,
      brewingInfo,
    };
  } else {
    throw new Error(
      `Error: Unable to parse brewing guide content for given tea: ${tea.name}`
    );
  }
};

export default function App() {
  const [teaType, setTeaType] = useState<TeaType>("all-products");
  const [teas, setTeas] = useState<Tea[]>([]);
  const [tea, setTea] = useState<TeaInfo | undefined>();
  const [page, setPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  useEffect(() => {
    const fetchData = async () => {
      const { teas, page, numberOfPages } = await getTeas(teaType);
      setTeas(teas);
      setPage(page);
      setNumberOfPages(numberOfPages);
      const teaInfo = await getTeaInfo(teas[0]);
      setTea(teaInfo);
    };
    fetchData();
  }, [teaType]);

  const onTeaSelection = async (tea: Tea) => {
    const teaInfo = await getTeaInfo(tea);
    setTea(teaInfo);
  };

  const onPageChange = async (newPage: number) => {
    const { teas, page, numberOfPages } = await getTeas(teaType, newPage);
    setTeas(teas);
    setPage(page);
    setNumberOfPages(numberOfPages);
  };

  return (
    <div className="App">
      <Button onClick={() => setTeaType("all-products")}>All</Button>
      <Button onClick={() => setTeaType("oolong")}>Oolong</Button>
      <List
        bordered
        loading={teas.length === 0}
        dataSource={teas}
        renderItem={(item) => (
          <List.Item
            style={{ cursor: "pointer" }}
            onClick={() => onTeaSelection(item)}
          >
            {item.name}
          </List.Item>
        )}
      />
      <Pagination
        simple
        current={page}
        defaultPageSize={12}
        total={12 * numberOfPages}
        onChange={onPageChange}
      />
      {tea ? (
        <>
          <p>{tea.name}</p>
          <p>{tea.description}</p>
          <Tabs defaultActiveKey="1">
            {tea.brewingInfo.map((brewInstructions, index) => (
              <Tabs.TabPane tab={brewInstructions.type} key={index + 1}>
                <BrewingPaneInfo
                  key={brewInstructions.type}
                  {...brewInstructions}
                />
              </Tabs.TabPane>
            ))}
          </Tabs>
        </>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}
