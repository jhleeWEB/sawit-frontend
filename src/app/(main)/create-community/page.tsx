import CommunityForm from "./_components/community-form";
import CommunityFormProvider from "./_components/community-form-provider";
import CommunityInfoPreview from "./_components/community-info-preview";

export default async function CreateCommunity() {
  return (
    <div className="main-container">
      <CommunityFormProvider>
        <main className="w-full px-2 py-8">
          <h1 className="mb-8 text-2xl font-bold">커뮤니티 만들기</h1>
          <CommunityForm />
          <section className="community-info-preview sticky bottom-2">
            <CommunityInfoPreview />
          </section>
        </main>
        <div
          className="right-menu-container"
          style={{
            top: "20%",
          }}
        >
          <CommunityInfoPreview />
        </div>
      </CommunityFormProvider>
    </div>
  );
}
