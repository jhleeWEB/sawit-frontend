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
  const [selectedItem, setSelectedItem] = useState<
    CommunityAutocompleteList | undefined
  >();
  useEffect(() => {
    const fetch = async () => {
      const result = await fetchCommunitySearchList(debounceValue);
      setAutocompleteItems(result);
    };
    fetch();
  }, [debounceValue]);

  return (
    <div>
      <Autocomplete
        aria-label="커뮤니티 선택"
        value={searchTerm}
        onValueChange={setSearchTerm}
        items={autocompleteItems}
        placeholder="커뮤니티 검색하기"
        classNames={{
          base: "max-w-xs",
          listboxWrapper: "max-h-[320px]",
          selectorButton: "text-default-500",
        }}
        inputProps={{
          classNames: {
            input: "ml-1",
            inputWrapper: "h-[48px]",
          },
        }}
        listboxProps={{
          emptyContent: "찾아봤는데... 아무것도 안나와요 :(",
          hideSelectedIcon: true,
          itemClasses: {
            base: [
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
          >
            <ul className="flex gap-2 items-center">
              <Avatar size="sm" src={item.icon_url} />
              <p className="text-md">p/ {item.name}</p>
            </ul>
          </AutocompleteItem>
        )}
      </Autocomplete>
      {selectedItem && (
        <div className="flex border rounded-lg items-center gap-2 p-4 mt-4">
          <Avatar src={selectedItem.icon_url} />
          <p className="text-lg">p/{selectedItem.name}</p>
        </div>
      )}
    </div>
  );
}
