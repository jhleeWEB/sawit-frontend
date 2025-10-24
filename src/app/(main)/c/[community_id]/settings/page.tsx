import fetchCommunity from "@/service/fetch-community";
import CommunityInfoPreview from "@/app/(main)/create-community/_components/community-info-preview";
import CommunityFormProvider, {
  CommunityFormState,
} from "@/app/(main)/create-community/_components/community-form-provider";
import CommunityEditForm from "./_components/community-edit-form";

export default async function Page({
  params,
}: {
  params: Promise<{ community_id: number }>;
}) {
  const { community_id } = await params;
  if (!community_id) {
    return;
  }
  const community_info = await fetchCommunity(community_id);
  if (!community_info) {
    return;
  }

  const initialState: CommunityFormState = {
    name: community_info.name,
    description: community_info.description,
    topics: community_info.topics,
    bannerPreview: community_info.banner_url,
    iconPreview: community_info.icon_url,
    isLoading: false,
    banner: undefined,
    icon: undefined,
  };

  return (
    <div className="main-container">
      <CommunityFormProvider initialState={initialState}>
        <main className="w-full px-2 py-8">
          <CommunityEditForm id={community_id} />
          <section className="community-info-preview sticky bottom-2">
            <CommunityInfoPreview buttonTitle="업데이트 하기" />
          </section>
        </main>
        <div
          className="right-menu-container"
          style={{
            top: "20%",
          }}
        >
          <CommunityInfoPreview buttonTitle="업데이트 하기" />
        </div>
      </CommunityFormProvider>
    </div>
  );
}
