/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useSearch } from "../../hooks/useSearch";
import { HouseInfo } from "../HomeSection/SearchBar";
import { addressState } from "../../recoil/AddressState";

export default function ResultBarSearch() {
  const { address, selectedTownData, typeAddress, setAddress } = useSearch();
  const setClickedAddress = useSetRecoilState(addressState);
  const navigate = useNavigate();
  const relatedRef = useRef<HTMLDivElement>(null);
  const [relatedResultShow, setRelatedResultShow] = useState(false);

  const clickResultOutside = (e: any) => {
    const currentRef = relatedRef.current;
    if (currentRef && !currentRef?.contains(e.target as Node)) {
      setRelatedResultShow(false);
    }
  };

  const showBuildingInfo = (
    id: number,
    apartmentName: string,
    address: string
  ) => {
    setClickedAddress({
      address: address,
      apartmentName: apartmentName,
      id: id,
    });
    navigate(`/result/${id}`);
    setAddress("");
    setRelatedResultShow(false);
  };

  const boldMatchingSubstring = (str: string, substr: string) => {
    const index = str.indexOf(substr);
    if (index !== -1) {
      return (
        <span>
          {str.substring(0, index)}
          <HighLightSpan>{substr}</HighLightSpan>
          {str.substring(index + substr.length)}
        </span>
      );
    }
    return str;
  };

  useEffect(() => {
    if (address.length > 0 && !relatedResultShow) {
      setRelatedResultShow(true);
    }
  }, [address.length]);

  useEffect(() => {
    document.addEventListener("click", clickResultOutside);
    return () => {
      document.removeEventListener("click", clickResultOutside);
    };
  }, [relatedRef.current]);

  return (
    <ResultBarSearchContainer>
      <ResultSearchMainDiv>
        <FaSearch />
        <input
          placeholder="주소, 건물명 등을 입력하세요"
          value={address}
          onChange={typeAddress}
        />
      </ResultSearchMainDiv>
      {relatedResultShow && (
        <ResultSearchResultDiv ref={relatedRef}>
          {selectedTownData !== null && selectedTownData.length > 0 ? (
            <ScrollDiv>
              {selectedTownData.map((el: HouseInfo, idx: number) => (
                <SearchResultContent
                  key={idx}
                  onClick={() =>
                    showBuildingInfo(el.id, el.apartmentName, el.address)
                  }
                >
                  {boldMatchingSubstring(el.address, address)}
                </SearchResultContent>
              ))}
            </ScrollDiv>
          ) : (
            <NoResearchContent>검색 결과가 없습니다</NoResearchContent>
          )}
        </ResultSearchResultDiv>
      )}
    </ResultBarSearchContainer>
  );
}

const ResultBarSearchContainer = styled.div`
  padding: 15px ${(props) => props.theme.padding.searchBar} 0;
  position: relative;
`;

const ResultSearchMainDiv = styled.div`
  input {
    width: 100%;
    height: 30px;
    border-radius: 20px;
    border: 3px solid ${(props) => props.theme.colors.primary};
    padding-left: 2rem;
    font-size: small;
    &::placeholder {
      color: ${(props) => props.theme.colors.primary};
    }
    &:focus {
      outline: none;
    }
  }

  svg {
    position: absolute;
    left: 1.3rem;
    top: 1.3rem;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const ResultSearchResultDiv = styled.div`
  position: absolute;
  width: 88%;
  left: 1rem;
  max-height: 20rem;
  top: 3rem;
  background-color: white;
  z-index: 10;
  border-radius: 30px;
  padding: 3px 12px;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-thumb {
    background: #c2c2c2;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #969696;
  }
`;

const ScrollDiv = styled.div`
  height: 100%;
  padding: 0 10px;
`;

const SearchResultContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 5px 0;
  margin: 3px 0;
  color: rgba(0, 0, 0, 0.75);
  font-size: 13px;
  &:hover {
    font-weight: bold;
  }
  transition: color 0.25s ease;
  overflow: hidden;
  cursor: pointer;
`;

const NoResearchContent = styled(SearchResultContent)`
  &:hover {
    font-weight: 400;
  }
`;

const HighLightSpan = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
`;
