"use client";

import ImageCropModal from "@/features/image-crop-modal";

import {
  Avatar,
  Button,
  Chip,
  Divider,
  Form,
  Input,
  Spinner,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { FormEvent, useState } from "react";
import { PiImageSquareThin, PiMagnifyingGlassLight } from "react-icons/pi";
import TopicChips from "./_components/topic-chips";
import FormTitle from "./_components/form-title";
import http from "@/lib/axios/http";
import { useRouter } from "next/navigation";

export default function CreateCommunity() {
  const route = useRouter();

  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [bannerBlob, setBannerBlob] = useState<Blob>();
  const [bannerPreview, setBannerPreview] = useState("");
  const [tempBanner, setTempBanner] = useState("");
  const [iconPreview, setIconPreview] = useState("");
  const [iconBlob, setIconBlob] = useState<Blob>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [topicFilter, setTopicFilter] = useState<string>("");
  const [errors, setErrors] = useState<{
    name: string | undefined;
    description: string | undefined;
  }>({
    name: undefined,
    description: undefined,
  });

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleOnClose = (topicToRemove: string) => {
    setSelectedTopics(
      selectedTopics.filter((topic) => topic !== topicToRemove)
    );
  };

  const handleOnClick = (topicToAdd: string) => {
    if (
      selectedTopics.length < 3 &&
      !selectedTopics.find((topic) => topic === topicToAdd)
    ) {
      setSelectedTopics((prev) => [...prev, topicToAdd]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitLoading(true);
    const formData = new FormData();
    formData.append("topics", JSON.stringify(selectedTopics));
    if (bannerBlob) {
      formData.append("bannerBlob", bannerBlob);
    }
    if (iconBlob) {
      formData.append("iconBlob", iconBlob);
    }
    formData.append("name", communityName);
    formData.append("description", communityDescription);
    const data = Object.fromEntries(formData);
    if (!data.name) {
      setErrors({ ...errors, name: "커뮤니티 이름이 필요합니다." });
    }
    if (!data.description) {
      setErrors({ ...errors, name: "커뮤니티 설명이 필요합니다." });
    }
    const res = await http.post(
      `${process.env.NEXT_PUBLIC_API_URL}/communities`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data;",
          "cache-control": "no-cache",
        },
      }
    );
    setIsSubmitLoading(false);

    if (res.status === 201) {
      route.push(`/p/${res.data.id}`);
    }
  };

  return (
    <div className="main-container">
      <div className="w-full">
        <Form id="community-form" onSubmit={handleSubmit}>
          <FormTitle
            title="커뮤니티에 대해서 알려주세요"
            description="이름과 설명은 다른분들이 당신의 커뮤니티가 어떤 곳인지 이해하는 데 도움이 됩니다."
          />
          <Input
            fullWidth
            required
            name="name"
            label="커뮤니티 이름을 작성해주세요."
            value={communityName}
            onValueChange={setCommunityName}
          />
          <small className="text-gray-400 w-full flex justify-end">
            {communityName.length}
          </small>
          <Textarea
            fullWidth
            required
            name="description"
            label="커뮤니티의 대해서 말해주세요."
            value={communityDescription}
            onValueChange={setCommunityDescription}
          />
          <small className="text-gray-400 w-full flex justify-end">
            {communityDescription.length}
          </small>
          <div className="w-full mt-16">
            <FormTitle
              title="커뮤니티를 꾸며보세요"
              description="시각적인 요소를 더하면 새로운 분들의 관심을 끌고 커뮤니티의 문화를 확립하는 데 도움이 됩니다! 언제든지 이 내용을 업데이트할 수 있습니다."
            />
            <div className="flex items-center justify-between mb-4 px-8">
              <h3>배너</h3>
              <Input
                type="file"
                radius="full"
                size="sm"
                className="w-[140px] cursor-pointer"
                startContent={
                  <PiImageSquareThin className="cursor-pointer" size={26} />
                }
                onChange={(event) => {
                  if (event.target.files) {
                    const [file] = event.target.files;
                    setTempBanner(URL.createObjectURL(file));
                    onOpen();
                    event.target.type = "number";
                    event.target.type = "file";
                  }
                }}
              />
              <ImageCropModal
                src={tempBanner}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                setBannerBlob={setBannerBlob}
                setBannerPreview={setBannerPreview}
              />
            </div>
            <div className="flex items-center justify-between px-8">
              <h3>아이콘</h3>
              <Input
                type="file"
                radius="full"
                size="sm"
                name="icon"
                className="w-[140px] cursor-pointer"
                startContent={
                  <PiImageSquareThin className="cursor-pointer" size={26} />
                }
                onChange={(event) => {
                  if (event.target.files) {
                    const [file] = event.target.files;
                    const url = URL.createObjectURL(file);
                    setIconPreview(url);
                    setIconBlob(file);
                  }
                }}
              />
            </div>
          </div>
          <div className="w-full mt-16">
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
              <h2 className="text-sm font-bold mt-2">{`주제 ${selectedTopics.length}/3`}</h2>
              <div className="flex min-h-[32px] gap-2">
                {selectedTopics.map((topic) => (
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
                topics={topics.anime}
                selectedTopics={selectedTopics}
                filter={topicFilter}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="예술"
                topics={topics.art}
                selectedTopics={selectedTopics}
                filter={topicFilter}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="사업 & 경제"
                topics={topics.business}
                selectedTopics={selectedTopics}
                filter={topicFilter}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="수집품 & 기타 취미"
                topics={topics.collectible}
                selectedTopics={selectedTopics}
                filter={topicFilter}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="교육 & 커리어"
                topics={topics.education}
                selectedTopics={selectedTopics}
                filter={topicFilter}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="패션 & 뷰티"
                topics={topics.fashion}
                selectedTopics={selectedTopics}
                filter={topicFilter}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="음식 & 음료"
                topics={topics.food}
                selectedTopics={selectedTopics}
                filter={topicFilter}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="게임"
                topics={topics.game}
                selectedTopics={selectedTopics}
                filter={topicFilter}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="건강 & 웰빙"
                topics={topics.health}
                selectedTopics={selectedTopics}
                filter={topicFilter}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="집 & 조경"
                topics={topics.home}
                selectedTopics={selectedTopics}
                filter={topicFilter}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="영화 & 드라마"
                topics={topics.movie}
                selectedTopics={selectedTopics}
                filter={topicFilter}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="연애 & 가족"
                topics={topics.relationship}
                selectedTopics={selectedTopics}
                filter={topicFilter}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
            </div>
          </div>
        </Form>
      </div>
      <div className="right-menu-container">
        <div className="border-1 rounded-lg shadow-lg">
          {bannerPreview ? (
            <div
              style={{
                /* @ts-expect-error custom style property added*/
                "--image-url": `url(${bannerPreview})`,
              }}
              className={`h-[60px] rounded-t-lg bg-no-repeat bg-cover bg-top bg-[image:var(--image-url)]`}
            />
          ) : (
            <div className={`h-[60px] bg-red-300 rounded-t-lg`} />
          )}
          <Divider />
          <div className="max-w-full flex items-center gap-4 p-4 pb-0">
            <Avatar
              isBordered
              size="md"
              className="shrink-0"
              src={iconPreview}
            />

            <div className="max-w-[calc(100%-64px)]">
              <h1 className="text-2xl font-bold break-words">
                p/{communityName}
              </h1>
              <div>
                <small>1 member</small>
                <span>•</span>
                <small>1 online</small>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap px-4 pt-2 gap-2">
            {selectedTopics.map((topic) => (
              <Chip
                size="sm"
                variant="bordered"
                className="border-1"
                key={`preview-topics-${topic}`}
              >
                {topic}
              </Chip>
            ))}
          </div>
          <p className="p-4 break-words">{communityDescription}</p>
        </div>
        <div className="mt-4">
          <Button
            fullWidth
            radius="full"
            color="success"
            form="community-form"
            type="submit"
          >
            {isSubmitLoading ? <Spinner /> : "커뮤니티 만들기"}
          </Button>
        </div>
      </div>
    </div>
  );
}

const topics = {
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
