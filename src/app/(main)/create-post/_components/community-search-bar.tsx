"use client";

import useDebounce from "@/app/hooks/use-debounce";
import { Autocomplete, AutocompleteItem, Avatar } from "@heroui/react";
import { ActionDispatch, useEffect, useState } from "react";
import fetchCommunitySearchList, {
  CommunityAutocompleteList,
} from "../_apis/fetch-community-search-list";

interface Props {
  formDispatch: ActionDispatch<
    [
      action: {
        type: string;
        payload: unknown;
      }
    ]
  >;
}

export default function CommunitySearchBar({ formDispatch }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceValue = useDebounce(searchTerm, 800);
  const [autocompleteItems, setAutocompleteItems] = useState<
    [] | CommunityAutocompleteList[]
  >([]);
  const [, setSelectedItem] = useState<CommunityAutocompleteList | undefined>();

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchCommunitySearchList(debounceValue);
      setAutocompleteItems(result);
    };
    fetch();
  }, [debounceValue]);

  return (
    <div className="flex">
      <Autocomplete
        aria-label="커뮤니티 선택"
        value={searchTerm}
        onValueChange={setSearchTerm}
        items={autocompleteItems}
        placeholder="커뮤니티 검색하기"
        classNames={{
          listboxWrapper: "max-h-[320px]",
          selectorButton: "text-default-500",
        }}
        inputProps={{
          classNames: {
            input: "ml-1",
            inputWrapper: "w-full h-[34px]",
          },
        }}
        listboxProps={{
          emptyContent: "찾아봤는데... 아무것도 안나와요 :(",
          hideSelectedIcon: true,
          itemClasses: {
            base: [
              "text-[10px]",
              "rounded-medium",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "dark:data-[hover=true]:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[hover=true]:bg-default-200",
              "data-[selectable=true]:focus:bg-default-100",
              "data-[focus-visible=true]:ring-default-500",
            ],
          },
        }}
        popoverProps={{
          offset: 10,
          classNames: {
            base: "rounded-large",
            content: "p-1 border-small border-default-100 bg-background",
          },
        }}
        radius="full"
        variant="bordered"
      >
        {(item) => (
          <AutocompleteItem
            aria-label={item.name}
            key={item.name}
            textValue={`p/${item.name}`}
            onClick={() => {
              setSelectedItem(item);
              formDispatch({ type: "update_community_id", payload: item.id });
            }}
            startContent={<Avatar size="sm" src={item.icon_url} />}
          >
            p/ {item.name}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
}
