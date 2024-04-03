import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { addressState } from "../../../pages/Home/State/AddressState";
import { IResultBodyTemplate } from "../PredictedPrice/PredictedPrice";
import ResultBarBodyTemplate from "../ResultBarBodyTemplate";

interface Selected {
  idx: number;
  selectedIdx: number;
}
interface News {
  [key: string]: string;
}
interface Page {
  page: number;
  curPage: number;
}

export default function RelatedNews({ scrollRef }: IResultBodyTemplate) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [dataType, setDataType] = useState<string>("sim");
  const [newsData, setNewsData] = useState<News[]>([]);
  const [curPage, setCurPage] = useState<number>(1);
  const address = `${
    useRecoilValue(addressState).address.split(" ")[1]
  } ${useRecoilValue(addressState).address.split(" ").at(-1)}`;
  const setDataSim = () => {
    setSelectedIdx(0);
    setDataType("sim");
    setCurPage(1);
  };
  const setDataDate = () => {
    setSelectedIdx(1);
    setDataType("date");
    setCurPage(1);
  };
  const setDateFormat = (str: string) => {
    const date = new Date(str);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };
  useEffect(() => {
    axios
      .get("https://port-0-homepserver-2aat2cluginjts.sel5.cloudtype.app/search", {
        params: {
          query: `${address} 부동산`,
          sort: dataType,
        },
      })
      .then((res) =>
        setNewsData(res.data.items.slice(curPage * 4 - 4, curPage * 4))
      );
  }, [dataType, address, curPage]);

  const openNews = (url: string) => {
    window.open(url, "_blank");
  };

  const [pageArr, setPageArr] = useState<number[]>([1, 2, 3, 4, 5]);

  useEffect(() => {
    if (curPage % 5 === 1) {
      setPageArr(Array.from({ length: 5 }, (_, index) => index + curPage));
    } else if (curPage % 5 === 0) {
      setPageArr(
        Array.from({ length: 5 }, (_, index) => curPage - index).reverse()
      );
    }
  }, [curPage]);

  const pagenation = (text: string) => {
    if (text === "prev") {
      if (curPage === 1) {
        setCurPage(1);
      } else if (curPage > 1) {
        setCurPage(curPage - 1);
      }
    } else if (text === "next") {
      if (curPage === 25) {
        setCurPage(25);
      } else if (curPage < 25) {
        setCurPage(curPage + 1);
      }
    }
  };
  const onClickPage = (el: number) => {
    setCurPage(el);
  };
  return (
    <ResultBarBodyTemplate title="관련뉴스" scrollRef={scrollRef} margin="3px">
      <RelatedNewsContainer>
        <RelatedNewsHeader>
          <DataTypeText idx={0} selectedIdx={selectedIdx} onClick={setDataSim}>
            •정확도순
          </DataTypeText>
          <DataTypeText idx={1} selectedIdx={selectedIdx} onClick={setDataDate}>
            •최신순
          </DataTypeText>
        </RelatedNewsHeader>
        {newsData.length > 0 ? (
          newsData.map((el: News) => {
            return (
              <NewsContentDiv onClick={() => openNews(el.originallink)}>
                <h3>{el.title.replace(/<\/br>|<\/?b>|&quot;|&gt;/g, "")}</h3>
                <p>
                  {el.description.replace(/<\/br>|<\/?b>|&quot;|&gt;/g, "")}
                </p>
                <div>
                  <span>{setDateFormat(el.pubDate)}</span>
                </div>
              </NewsContentDiv>
            );
          })
        ) : (
          <NewsContentDiv>검색 결과가 없습니다.</NewsContentDiv>
        )}

        <PagenationDiv>
          <IoMdArrowDropleft onClick={() => pagenation("prev")} />
          <div>
            {pageArr.map((el) => (
              <PageSpan
                page={el}
                curPage={curPage}
                onClick={() => onClickPage(el)}
              >
                {el}
              </PageSpan>
            ))}
          </div>
          <IoMdArrowDropright onClick={() => pagenation("next")} />
        </PagenationDiv>
      </RelatedNewsContainer>
    </ResultBarBodyTemplate>
  );
}

const RelatedNewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;
const RelatedNewsHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 1%;
`;
const DataTypeText = styled.span<Selected>`
  font-size: 0.5em;
  text-align: center;
  margin-left: 3%;
  color: ${(props) =>
    props.selectedIdx === props.idx
      ? props.theme.colors.primary
      : props.theme.colors.grayFont};
  transition: 0.3s ease;
  cursor: pointer;
`;
const NewsContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 25%;
  padding: 2%;
  margin: 1% 0;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    background-color: #e9e9e9;
  }
  h3 {
    font-size: 0.85em;
    margin-bottom: 2%;
  }
  p {
    font-size: 0.5em;
    margin-bottom: 2%;
    overflow: hidden;
  }
  div {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    span {
      font-size: 0.75em;
      color: ${(props) => props.theme.colors.grayFont};
    }
  }
`;
const PagenationDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  height: auto;
  padding: 2%;
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 25%;
    &:nth-child(2) {
      width: 50%;
    }
    span {
      cursor: pointer;
    }
  }
  svg {
    cursor: pointer;
  }
`;
const PageSpan = styled.span<Page>`
  font-size: 0.8em;
  color: ${(props) =>
    props.curPage === props.page ? props.theme.colors.primary : "black"};
`;
