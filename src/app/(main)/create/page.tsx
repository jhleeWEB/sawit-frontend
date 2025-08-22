"use client";

import ImageCropModal from "@/features/image-crop";

import {
  Avatar,
  Chip,
  Divider,
  Form,
  Input,
  Modal,
  ModalContent,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import { PiImageSquareThin } from "react-icons/pi";
import TopicChips from "./_components/topic-chips";

export default function CreateCommunity() {
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [banner, setBanner] = useState("");
  const [tempBanner, setTempBanner] = useState("");
  const [icon, setIcon] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [topicFilter, setTopicFilter] = useState<string>("");

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

  return (
    <>
      <div className="col-start-1 col-span-2">
        <Form>
          <Input
            fullWidth
            required
            label="커뮤니티 이름을 작성해주세요."
            value={communityName}
            onValueChange={setCommunityName}
          />
          <small>{communityName.length}</small>
          <Textarea
            fullWidth
            label="커뮤니티의 대해서 말해주세요."
            value={communityDescription}
            onValueChange={setCommunityDescription}
          />
          <small>{communityDescription.length}</small>
          <div className="w-full">
            <div>
              <h3>배너를 넣어보세요</h3>
              <Input
                type="file"
                radius="full"
                startContent={<PiImageSquareThin size={26} />}
                src={banner}
                onChange={(event) => {
                  if (event.target.files) {
                    const [file] = event.target.files;
                    const url = URL.createObjectURL(file);
                    setTempBanner(url);
                    onOpen();
                  }
                }}
              />
              <ImageCropModal
                src={tempBanner}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                setImage={setBanner}
              />
            </div>
            <div>
              <h3>아이콘 넣어보세요~</h3>
              <Input
                type="file"
                radius="full"
                startContent={<PiImageSquareThin size={26} />}
                src={icon}
                onChange={(event) => {
                  if (event.target.files) {
                    const [file] = event.target.files;
                    const url = URL.createObjectURL(file);
                    setIcon(url);
                  }
                }}
              />
            </div>
          </div>
          <div className="w-full">
            <Input radius="full" placeholder="주제 필터" />
            <div>
              <h2>{`주제 ${selectedTopics.length}/3`}</h2>
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
            <div className="flex flex-col gap-2 max-h-[400px] overflow-auto">
              <TopicChips
                title="애니 & 코스플레이"
                topics={topics.anime}
                selectedTopics={selectedTopics}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="예술"
                topics={topics.art}
                selectedTopics={selectedTopics}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="사업 & 경제"
                topics={topics.business}
                selectedTopics={selectedTopics}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="수집품 & 기타 취미"
                topics={topics.collectible}
                selectedTopics={selectedTopics}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="교육 & 커리어"
                topics={topics.education}
                selectedTopics={selectedTopics}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="패션 & 뷰티"
                topics={topics.fashion}
                selectedTopics={selectedTopics}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="음식 & 음료"
                topics={topics.food}
                selectedTopics={selectedTopics}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="게임"
                topics={topics.game}
                selectedTopics={selectedTopics}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="건강 & 웰빙"
                topics={topics.health}
                selectedTopics={selectedTopics}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="집 & 조경"
                topics={topics.home}
                selectedTopics={selectedTopics}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="영화 & 드라마"
                topics={topics.movie}
                selectedTopics={selectedTopics}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
              <TopicChips
                title="연애 & 가족"
                topics={topics.relationship}
                selectedTopics={selectedTopics}
                onClick={handleOnClick}
                onClose={handleOnClose}
              />
            </div>
          </div>
        </Form>
      </div>
      <div className="col-start-3 col-span-1 bg-teal-100 flex flex-col p-4 pt-16">
        <div className="w-full bg-blue-400 rounded-lg shadow-lg">
          {banner ? (
            <div
              style={{
                /* @ts-expect-error custom style property added*/
                "--image-url": `url(${banner})`,
              }}
              className={`h-[60px] rounded-t-lg bg-no-repeat bg-cover bg-top bg-[image:var(--image-url)]`}
            />
          ) : (
            <div className={`h-[60px] bg-red-300 rounded-t-lg`} />
          )}
          <Divider />
          <div className="flex items-center gap-4 m-4">
            <Avatar isBordered src={icon} />
            <div>
              <h1 className="w-full text-2xl font-bold break-words">
                p/{communityName}
              </h1>
              <span>
                <small>1 member</small>
                <span>•</span>
                <small>1 online</small>
              </span>
            </div>
          </div>
          <p className="break-words">{communityDescription}</p>
        </div>
      </div>
    </>
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
