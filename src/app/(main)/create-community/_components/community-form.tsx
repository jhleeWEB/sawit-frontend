"use client";

import {
  addToast,
  Button,
  Chip,
  Form,
  Input,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import FormTitle from "./form-title";
import { PiImageSquareThin, PiMagnifyingGlassLight } from "react-icons/pi";
import BannerCropperModal from "../../c/[community_id]/create/_components/banner-crop-modal";
import IconCropperModal from "../../c/[community_id]/create/_components/icon-crop-modal";
import TopicChips from "./topic-chips";
import createNewCommunity from "../_services/create-new-community";
import {
  useCommunityFormDispatch,
  useCommunityFormState,
} from "./community-form-provider";
import { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function CommunityForm() {
  const { name, banner, icon, description, topics } = useCommunityFormState();
  const dispatch = useCommunityFormDispatch();
  const router = useRouter();
  const [topicFilter, setTopicFilter] = useState<string>("");

  const {
    isOpen: isBannerModalOpen,
    onOpen: onBannerModalOpen,
    onOpenChange: onBannerOpenChange,
  } = useDisclosure();
  const {
    isOpen: isIconModalOpen,
    onOpen: onIconModalOpen,
    onOpenChange: onIconOpenChange,
  } = useDisclosure();

  const handleOnClose = (topicToRemove: string) => {
    dispatch({
      type: "update_topics",
      payload: topics.filter((topic) => topic !== topicToRemove),
    });
  };

  const handleOnClick = (topicToAdd: string) => {
    if (topics.length < 3 && !topics.find((topic) => topic === topicToAdd)) {
      dispatch({ type: "update_topics", payload: [...topics, topicToAdd] });
    }
  };

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch({ type: "buzy" });
      const data = await createNewCommunity({
        name,
        description,
        banner,
        icon,
        topics,
      });
      if (data) {
        addToast({
          title: "커뮤니티 생성",
          description: "아바타 변경 성공했습니다",
          color: "success",
        });
        router.push(`/c/${data.id}`);
      } else {
        addToast({
          title: "커뮤니티 생성",
          description: "아바타 변경 실패했습니다",
          color: "danger",
        });
      }
      dispatch({ type: "idle" });
    },

    [name, description, banner, icon, topics, dispatch, router],
  );

  return (
    <Form id="community-form" onSubmit={handleSubmit}>
      <FormTitle
        title="커뮤니티에 대해서 알려주세요"
        description="이름과 설명은 다른분들이 당신의 커뮤니티가 어떤 곳인지 이해하는 데 도움이 됩니다."
      />
      <Input
        fullWidth
        required
        radius="lg"
        variant={"bordered"}
        name="name"
        label="커뮤니티 이름"
        maxLength={50}
        value={name}
        size="lg"
        onValueChange={(value) =>
          dispatch({ type: "update_name", payload: value })
        }
        classNames={{
          inputWrapper: "border",
          input: "text-xl",
        }}
      />
      <small className="flex w-full justify-end text-gray-400">
        {name.length}
      </small>
      <Textarea
        fullWidth
        required
        size="lg"
        maxLength={500}
        name="description"
        label="커뮤니티 설명"
        variant="bordered"
        value={description}
        onValueChange={(value) =>
          dispatch({ type: "update_description", payload: value })
        }
        classNames={{
          inputWrapper: "border",
        }}
      />
      <small className="flex w-full justify-end text-gray-400">
        {description.length}
      </small>

      <div className="mb-8 w-full">
        <FormTitle
          title="커뮤니티를 꾸며보세요"
          description="시각적인 요소를 더하면 새로운 분들의 관심을 끌고 커뮤니티의 문화를 확립하는 데 도움이 됩니다! 언제든지 이 내용을 업데이트할 수 있습니다."
        />
        <div className="mb-4 flex items-center justify-between px-8">
          <h3>배너</h3>
          <Button
            radius="full"
            variant="bordered"
            size="sm"
            className="w-[140px] cursor-pointer border"
            startContent={
              <PiImageSquareThin className="cursor-pointer" size={26} />
            }
            onPress={onBannerModalOpen}
          >
            이미지 선택하기
          </Button>
          <BannerCropperModal
            isOpen={isBannerModalOpen}
            onOpenChange={onBannerOpenChange}
            aspect={10}
            outWidth={1028}
            outHeight={128}
            onConfirm={(blob, url) => {
              dispatch({ type: "update_banner", payload: blob });
              dispatch({ type: "update_banner_preview", payload: url });
            }}
          />
        </div>
        <div className="flex items-center justify-between px-8">
          <h3>아이콘</h3>
          <Button
            variant="bordered"
            radius="full"
            size="sm"
            name="icon"
            className="w-[140px] cursor-pointer border"
            startContent={
              <PiImageSquareThin className="cursor-pointer" size={26} />
            }
            onPress={onIconModalOpen}
          >
            아이콘 선택하기
          </Button>
          <IconCropperModal
            isOpen={isIconModalOpen}
            onOpenChange={onIconOpenChange}
            onConfirm={(blob, url) => {
              dispatch({ type: "update_icon", payload: blob });
              dispatch({ type: "update_icon_preview", payload: url });
            }}
          />
        </div>
      </div>
      <div className="mb-8 w-full">
        <FormTitle
          title="주제 추가"
          description="관심 있는분들이 당신의 커뮤니티를 찾을 수 있도록 최대 3개의 주제를 추가하세요."
        />
        <Input
          radius="full"
          placeholder="주제 필터"
          value={topicFilter}
          onValueChange={setTopicFilter}
          startContent={<PiMagnifyingGlassLight size={18} />}
        />
        <div>
          <h2 className="mt-2 text-sm font-bold">{`주제 ${topics.length}/3`}</h2>
          <div className="flex min-h-[32px] gap-2">
            {topics.map((topic) => (
              <Chip
                radius="none"
                variant="bordered"
                className="border-1"
                size="sm"
                key={`selected-topics-${topic}`}
                onClose={() => handleOnClose(topic)}
              >
                {topic}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <TopicChips
            title="애니 & 코스플레이"
            topics={topicsOptions.anime}
            selectedTopics={topics}
            filter={topicFilter}
            onClick={handleOnClick}
            onClose={handleOnClose}
          />
          <TopicChips
            title="예술"
            topics={topicsOptions.art}
            selectedTopics={topics}
            filter={topicFilter}
            onClick={handleOnClick}
            onClose={handleOnClose}
          />
          <TopicChips
            title="사업 & 경제"
            topics={topicsOptions.business}
            selectedTopics={topics}
            filter={topicFilter}
            onClick={handleOnClick}
            onClose={handleOnClose}
          />
          <TopicChips
            title="수집품 & 기타 취미"
            topics={topicsOptions.collectible}
            selectedTopics={topics}
            filter={topicFilter}
            onClick={handleOnClick}
            onClose={handleOnClose}
          />
          <TopicChips
            title="교육 & 커리어"
            topics={topicsOptions.education}
            selectedTopics={topics}
            filter={topicFilter}
            onClick={handleOnClick}
            onClose={handleOnClose}
          />
          <TopicChips
            title="패션 & 뷰티"
            topics={topicsOptions.fashion}
            selectedTopics={topics}
            filter={topicFilter}
            onClick={handleOnClick}
            onClose={handleOnClose}
          />
          <TopicChips
            title="음식 & 음료"
            topics={topicsOptions.food}
            selectedTopics={topics}
            filter={topicFilter}
            onClick={handleOnClick}
            onClose={handleOnClose}
          />
          <TopicChips
            title="게임"
            topics={topicsOptions.game}
            selectedTopics={topics}
            filter={topicFilter}
            onClick={handleOnClick}
            onClose={handleOnClose}
          />
          <TopicChips
            title="건강 & 웰빙"
            topics={topicsOptions.health}
            selectedTopics={topics}
            filter={topicFilter}
            onClick={handleOnClick}
            onClose={handleOnClose}
          />
          <TopicChips
            title="집 & 조경"
            topics={topicsOptions.home}
            selectedTopics={topics}
            filter={topicFilter}
            onClick={handleOnClick}
            onClose={handleOnClose}
          />
          <TopicChips
            title="영화 & 드라마"
            topics={topicsOptions.movie}
            selectedTopics={topics}
            filter={topicFilter}
            onClick={handleOnClick}
            onClose={handleOnClose}
          />
          <TopicChips
            title="연애 & 가족"
            topics={topicsOptions.relationship}
            selectedTopics={topics}
            filter={topicFilter}
            onClick={handleOnClick}
            onClose={handleOnClose}
          />
        </div>
      </div>
    </Form>
  );
}

const topicsOptions = {
  art: ["예술공연", "건축", "디자인", "예술", "영상", "디지털 예술", "사진"],
  business: [
    "개인재산",
    "투자",
    "코인",
    "경제",
    "비즈니스 뉴스",
    "협상",
    "시장",
    "스타트업",
    "사업",
    "주식",
    "부동산",
  ],
  anime: ["만화책", "애니", "코스플레이"],
  collectible: ["프라모델", "레고", "수집", "한정판", "장난감", "신발"],
  education: ["공부", "교육", "커리어"],
  fashion: [
    "네일",
    "머리",
    "화장",
    "패션",
    "악세사리",
    "뷰티",
    "웨딩",
    "문신 & 피어싱",
    "피부관리",
    "시계",
    "데일리룩",
  ],
  food: ["레시피", "맛집", "디저트", "메뉴", "술", "비건", "채식주의"],
  game: [
    "기타 게임",
    "콘솔게임",
    "장비",
    "어드벤처 게임",
    "게임 뉴스",
    "게임 토론",
    "액션 게임",
    "전략 게임",
    "시뮬레이션 게임",
    "보드게임",
    "모바일 게임",
    "PC 게임",
    "스포츠 게임",
  ],
  health: [
    "운동",
    "피트니스",
    "헬스",
    "필라테스",
    "크로스핏",
    "자전거",
    "러닝",
  ],
  home: [
    "DIY",
    "재능",
    "집 꾸미기",
    "조경",
    "집 개선",
    "주방",
    "화장실",
    "거실",
  ],
  relationship: ["데이트", "소개팅", "자만추", "지랄추", "사랑", "가정"],
  movie: [
    "코미디 영화",
    "공포 영화",
    "판타지 영화",
    "액션 영화",
    "다큐",
    "드라마",
    "사이언스 픽션 영화",
    "예능",
    "뉴스",
    "히어로 영화",
    "스릴러 영화",
    "영화 평",
  ],
};
