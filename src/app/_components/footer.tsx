export default function Footer() {
	return (
		<div className='my-24'>
			<div className='flex gap-2 mb-8 [&>a]:text-sm'>
				<a>회사소개</a>
				<a>이용약관</a>
				<a className='font-bold'>개인정보처리방침</a>
				<a>청소년보호정책</a>
				<a>공지사항</a>
			</div>
			<div className='flex flex-col gap-1 [&>p]:text-xs text-gray-500'>
				<p>이중훈 사업자 정보</p>
				<p>공동대표이사 이중훈 | 호스팅서비스사업자 이중훈</p>
				<p>
					사업자등록번호 220-88-02594|통신판매업 신고번호 2018-성남분당B-0004
				</p>
				<p>
					대표전화 1644-4755|이메일 contact@KakaoPage.com|경기도 성남시 분당구
					판교역로 235, 에이치스퀘어 N동 8, 9, 10층
				</p>
				<p className='mt-8'>© Jhlee Entertainment Corp.</p>
			</div>
		</div>
	);
}
