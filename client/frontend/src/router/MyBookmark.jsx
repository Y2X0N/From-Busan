import classes from "./MyBookmark.module.css";
import { useAuth } from "../AuthProvider";
import { useState } from "react";
import { Link } from "react-router-dom";

function MyBookmark() {
  const { user } = useAuth();
  const [showList, setShowList] = useState("touristSpot");

  return (
    <>
      <div className={classes.container}>
        <div className={classes.pageTitle}>
          <div>
            <h2>{user.member_id}님의 찜목록</h2>
          </div>
        </div>

        <nav className={classes.navContainer}>
          <span
            className={`${showList === "touristSpot" ? classes.active : ""}`}
            onClick={() => setShowList("touristSpot")}
          >
            명소
          </span>
          <span
            className={`${showList === "festival" ? classes.active : ""}`}
            onClick={() => setShowList("festival")}
          >
            축제
          </span>
        </nav>
        {showList === "touristSpot" && (
          <>
            <div className={classes.ContentsContainer}>
              {mockTouristSpot.map((data) => (
                <div
                  className={classes.card}
                  style={{ color: "#009688" }}
                  key={Object.values(data)[0]}
                >
                  <div className={classes.imgBx}>
                    <img src={data.main_img_normal} />
                  </div>
                  <div className={classes.content}>
                    <h2>{data.main_title}</h2>
                    <p>
                      {data.itemcntnts.length > 50
                        ? data.itemcntnts.substring(0, 50) + "..."
                        : data.itemcntnts}
                    </p>

                    <div className={classes.listItem}>
                      <div>
                        <i
                          class="far fa-heart testHeart"
                          style={{
                            color: "#da202c",
                            fontSize: "20px",
                            marginRight: "4px",
                          }}
                          title="like"
                        ></i>
                        <span style={{ fontSize: "20px", color: "black" }}>
                          {data.place_like}
                        </span>
                      </div>
                      <div>
                        <i
                          class="fas fa-eye"
                          style={{ fontSize: "20px", marginRight: "4px" }}
                          title="hits"
                        ></i>
                        <span style={{ fontSize: "20px", color: "black" }}>
                          {data.hit}
                        </span>
                      </div>
                    </div>
                    <Link
                      className={classes.link}
                      to={`/tourist/${Object.values(data)[0]}`}
                    >
                      상세보기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.noContent}>
              {mockTouristSpot.length === 0 && (
                <span>찜 한 명소가 없습니다</span>
              )}
            </div>
          </>
        )}

        {showList === "festival" && (
          <>
            <div className={classes.ContentsContainer}>
              {mockFestival.map((data) => (
                <div
                  className={classes.card}
                  style={{ color: "#009688" }}
                  key={Object.values(data)[0]}
                >
                  <div className={classes.imgBx}>
                    <img src={data.main_img_normal} />
                  </div>
                  <div className={classes.content}>
                    <h2>{data.main_title}</h2>
                    <p>
                      {data.itemcntnts.length > 50
                        ? data.itemcntnts.substring(0, 50) + "..."
                        : data.itemcntnts}
                    </p>

                    <div className={classes.listItem}>
                      <div>
                        <i
                          class="far fa-heart testHeart"
                          style={{
                            color: "#da202c",
                            fontSize: "20px",
                            marginRight: "4px",
                          }}
                          title="like"
                        ></i>
                        <span style={{ fontSize: "20px", color: "black" }}>
                          {data.place_like}
                        </span>
                      </div>
                      <div>
                        <i
                          class="fas fa-eye"
                          style={{ fontSize: "20px", marginRight: "4px" }}
                          title="hits"
                        ></i>
                        <span style={{ fontSize: "20px", color: "black" }}>
                          {data.hit}
                        </span>
                      </div>
                    </div>
                    <Link
                      className={classes.link}
                      to={`/festival/${Object.values(data)[0]}`}
                    >
                      상세보기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.noContent}>
              {mockFestival.length === 0 && <span>찜 한 축제가 없습니다</span>}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MyBookmark;

const mockTouristSpot = [
  {
    tourist_Spot_id: 259,
    main_title: "죽성성당",
    gugun_nm: null,
    lat: null,
    lng: null,
    place: null,
    title: null,
    subTitle: null,
    addr1: null,
    cntct_tel: null,
    homepage_url: null,
    trfc_info: null,
    hldy_info: null,
    usage_day_week_and_time: null,
    usage_amount: null,
    middle_size_rm1: null,
    main_img_normal:
      "https://www.visitbusan.net/uploadImgs/files/cntnts/20191222181829937_ttiel",
    main_img_thumb: null,
    itemcntnts:
      "동해바다의 에메랄드빛을 고스란히 담고 있는 기장 앞바다는 이제 많은 이들이 찾는 곳이 됐다. 날이 좋으면 좋은 대로, 날이 흐리면 흐린 대로 드라이브하기 더없이 좋은 코스에 경치 좋은 낭만카페를 찾아 기장으로 오는 사람들. 이들이 빼놓지 않고 찾는 곳, 기장의 죽성성당이다.부산 기장군 죽성리에 위치한 죽성성당은 작은 어촌마을에 위치한 지리적 특성 덕분인지 남다른 분위기를 간직하고 있다. 중세시대의 어느 바닷가 마을을 그대로 옮겨 놓은 것 같은 풍경은 마치 한 폭의 그림 같다. 바위 위로 부서지는 하얀 포말은 성당의 붉은 지붕과 대비되어 이곳을 찾는 이들의 시선을 한눈에 사로잡는다.금방이라도 미사시간을 알리는 종이 울릴 것만 같지만, 이 공간은 2009년 SBS 드라마 ‘드림’을 촬영하기 위해 지어진 드라마 세트장이다. 오래 전 방영된 드라마는 잊혀졌지만 잘 만들어진 이 공간만큼은 기장을 찾는 여행객의 필수 코스라고 할 정도로 명소가 되었다.죽성성당에서 가장 많은 이들이 줄을 서서 기다리는 곳은 마치 액자의 프레임을 그대로 옮겨 놓은 듯한 포토존이다. 액자 속으로 들어간 푸른 바다와 하늘이 더없이 아름다운 배경을 만들어 준다. 탁 트인 바다를 바라보며 혼자만의 시간을 가져도 좋고 사랑하는 이와 알콩달콩 영화를 찍어도 예뻐만 보인다. 성당을 둘러싼 주변 경치가 어느 것 하나 놓칠 수 없다. 성당 옆 울퉁불퉁 기묘한 너럭바위는 탁 트인 바다를 온몸으로 만끽할 수 있는 천혜의 장소다. 해운대나 광안리 해변의 모습과는 달리 작은 바닷가 마을의 한적한 정취를 느끼고 싶다면 이만한 곳도 없다. 성당 내부는 갤러리로 운영되고 있어서 운 좋게 전시일정과 겹친다면 뜻하지 않은 볼거리를 경험할 수 있다.성당에서 도보로 10분 정도의 거리에 위치한 죽성리 해송도 특이한 풍경 중 하나다. 이 해송은 5그루의 나무가 모여 마치 한 그루의 큰 나무처럼 보이는 노거수로 수령은 약 250년∼300년으로 추정된다. 예로부터 동네 사람들이 풍어제를 지내던 곳으로, 서낭신을 모신 국수당이 있어 민속적 가치가 높은 곳이다. 아래로 축축 늘어진 노송 가지가 마치 여행자를 부르는 것만 같다.죽성성당은 푸른 하늘, 끝없는 바다와 어우러져 한층 그 매력을 더한다. 시원한 바람과 철썩이는 파도소리가 상쾌한 기운을 만든다. 붉은 뾰족 지붕의 성당과 대자연의 만남은 바쁜 일상을 살아가는 현대인의 작은 낙원일지도 모른다.",
    place_like: -3,
    restaurant_id: null,
    wish_list: null,
    hit: 1403,
  },
  {
    tourist_Spot_id: 286,
    main_title: "송도해수욕장",
    gugun_nm: null,
    lat: null,
    lng: null,
    place: null,
    title: null,
    subTitle: null,
    addr1: null,
    cntct_tel: null,
    homepage_url: null,
    trfc_info: null,
    hldy_info: null,
    usage_day_week_and_time: null,
    usage_amount: null,
    middle_size_rm1: null,
    main_img_normal:
      "https://www.visitbusan.net/uploadImgs/files/cntnts/20191225175459392_ttiel",
    main_img_thumb: null,
    itemcntnts:
      "나이 지긋한 어르신의 추억 속 해수욕장이 젊은이들의 핫플로 다시 태어났다면?SNS를 뜨겁게 달구며 너도나도 업로드 경쟁중인 장소의 주인공 송도해수욕장으로 간다.송도해수욕장은 1913년에 개장한 우리나라 1호 해수욕장으로 개장 100주년을 넘어선 해수욕장이다. 1960~70년대 최고의 전성기를 누렸으나 80년대에 들어서면서 아무도 찾지 않는 쓸쓸한 해수욕장이 되어버렸다. 하지만 천혜의 자연환경을 가진 송도해수욕장의 훼손을 안타까워하는 마음이 모여 지속적인 정비가 이루어졌고, 그 결과 예전보다 더 아름다운 해수욕장으로 변모하였다. 깨끗한 모래사장과 맑은 수질, 구름산책로, 해상케이블카를 가진 송도해수욕장은 이제 연간 500만이 넘는 관광객이 찾는 명소가 되었다.짙푸른 송도 바다를 좀 더 가까이 느끼기 위해 송도스카이워크 구름산책로로 나간다. 조용한 바다 위를 유영하는 돛단배를 연상시키는 송도호를 지나 구름산책로로 들어서면 넓은 송도 앞바다를 품에 가득 안을 수 있다. 다리 곳곳에 자리한 투명바닥 아래로 출렁이는 바닷물이 시선을 사로잡고, 머리 위로 지나가는 해상케이블카를 보면 저절로 손을 흔들게 된다. 산책로 중간에 위치한 바위섬은 인어와 어부의 안타까운 러브스토리를 전해주며 여행자의 발길을 머물게 한다. 다정다감 가족여행이든 꽁냥꽁냥 커플여행이든 송도해상케이블카를 그냥 지나칠 수 없다. 송림공원에서 암남공원까지 운행되는 케이블카는 크리스탈캐빈을 타고 바다 위를 가로지르며 발아래 펼쳐지는 아찔한 바다와 기암절벽을 맘껏 누릴 수 있는 관광코스다.해상케이블카의 암남공원 정류장인 송도스카이파크는 다양한 테마로 여행객을 기다린다. 아이들은 다이노어드벤처를 그냥 지나칠 리 없다. 실물크기의 공룡을 만나 본인의 최애 공룡을 찾으며 시간가는 줄 모른다. 연인들은 곧장 타임캡슐을 사서 스카이하버전망대로 향한다. 메모지에 서로의 사랑을 꼭꼭 눌러 담아 모멘트캡슐에 넣으면 캡슐은 2년간 보관된다. 스카이하버전망대에서는 송도해수욕장의 전경과 암남공원, 부산항까지 한눈에 감상할 수 있다.희고 고운 백사장에서 밀려오는 파도를 즐기며 거닐어도 좋고, 구름산책로의 끝에서 만나는 드넓은 바다와 해안절경을 내 것으로 만들어도 좋다. 해상케이블카를 타고 송도 바다 위를 날아보는 것 또한 너무 좋다.100년을 넘어 다시 태어난 송도가 여러분을 기다린다.",
    place_like: 1,
    restaurant_id: null,
    wish_list: null,
    hit: 32,
  },
  {
    tourist_Spot_id: 343,
    main_title: "송상현광장",
    gugun_nm: null,
    lat: null,
    lng: null,
    place: null,
    title: null,
    subTitle: null,
    addr1: null,
    cntct_tel: null,
    homepage_url: null,
    trfc_info: null,
    hldy_info: null,
    usage_day_week_and_time: null,
    usage_amount: null,
    middle_size_rm1: null,
    main_img_normal:
      "https://www.visitbusan.net/uploadImgs/files/cntnts/20191227175243198_ttiel",
    main_img_thumb: null,
    itemcntnts:
      "도심 한가운데 아름다운 숲과 실개천을 간직한 송상현광장, 산들바람 부는 날에 메타세쿼이아 나무 아래에서 나만의 여유를 즐기기에 안성맞춤인 곳이다. 카페와 야외공연장 등 편의시설도 갖추고 있어서 다양한 이벤트와 공연을 관람할 수 있는 곳, 송상현광장은 시민을 위한 부산 최대 규모의 도심광장이다.",
    place_like: 0,
    restaurant_id: null,
    wish_list: null,
    hit: 23,
  },
  {
    tourist_Spot_id: 261,
    main_title: "해동용궁사",
    gugun_nm: null,
    lat: null,
    lng: null,
    place: null,
    title: null,
    subTitle: null,
    addr1: null,
    cntct_tel: null,
    homepage_url: null,
    trfc_info: null,
    hldy_info: null,
    usage_day_week_and_time: null,
    usage_amount: null,
    middle_size_rm1: null,
    main_img_normal:
      "https://www.visitbusan.net/uploadImgs/files/cntnts/20191222190823385_ttiel",
    main_img_thumb: null,
    itemcntnts:
      "시원하게 트인 기장 앞바다에서 밀려오는 파도소리를 들어본 적 있는지. 감탄이 절로 나오는 해안절경과 끝이 보이지 않는 망망대해가 바로 내 눈앞에 있다면 어떨까.바다와 파도와 바람과 그리고 숨멋뷰가 기다리고 있는 풍경, 해동용궁사로 가자.부산 기장의 시랑리 해안에 위치한 해동용궁사는 정암화상(晸庵和尙)이 바닷가에서 용을 타고 승천하는 관세음보살을 꿈에 보았다는 이야기에서 이름이 유래되었다. 산과 바다가 맞닿은 육지의 끝자락에 해동용궁사가 한 폭의 그림처럼 걸려있다.경내로 향하는 길목에서 제일 먼저 만나게 되는 십이지신상은 여행객들에게 자신이 태어난 해의 동물을 찾아 함께 사진을 찍는 재미를 안겨주는 곳이다. 십이지신은 열두 방위의 땅을 지키며 잡귀의 침범을 막고 인간의 오복을 빌어주는 수호신과도 같다. 일주문을 지나 송림 사이로 이어진 108계단에 들어서면 마침내 푸른 바다를 품은 해동용궁사와 만나게 된다. 사찰과 연결된 용문교 위에서는 많은 방문자들이 동전을 던지며 소원을 비는 광경을 자주 목격하게 되는데 이는 간절히 빌면 한 가지 소원은 꼭 이뤄준다는 용궁사의 영험함 때문이다. 한국에서 가장 아름다운 절이라는 말처럼 경내 전체가 바다뷰인 덕에 서 있는 그곳이 저절로 포토존이 된다. 탁 트인 바다전망을 마음껏 담고 싶다면 대웅전 옆 계단을 올라보길 추천한다. 자애로운 미소를 띤 해수관음대불과 조우하고 발아래 푸른 바다가 내 것이 되는 곳에서 인생사진을 남길 수 있다.밀려오는 파도와 기암괴석이 조화를 이루는 해안절경을 만끽하고 싶다면 해안산책로를 따라가 보자. 하늘과 바다를 가로지르는 수평선 저 끝까지 모두 내어주는 해돋이바위는 단연 해동용궁사의 핫플레이스다. 푸른 바다와 함께 걷는 해파랑길 1코스에 속하는 해안산책로는 뚜벅이 여행자들의 발걸음 또한 쉬어가게 만든다.",
    place_like: 0,
    restaurant_id: null,
    wish_list: null,
    hit: 10,
  },
  {
    tourist_Spot_id: 256,
    main_title: "깡깡이 예술마을",
    gugun_nm: null,
    lat: null,
    lng: null,
    place: null,
    title: null,
    subTitle: null,
    addr1: null,
    cntct_tel: null,
    homepage_url: null,
    trfc_info: null,
    hldy_info: null,
    usage_day_week_and_time: null,
    usage_amount: null,
    middle_size_rm1: null,
    main_img_normal:
      "https://www.visitbusan.net/uploadImgs/files/cntnts/20191222171209005_ttiel",
    main_img_thumb: null,
    itemcntnts:
      "영도다리 건너 자갈치시장 맞은 편 물양장에 배들이 가득 들어차 있다. 세상에 못 고치는 배는 없다는 전설적인 수리조선의 메카 깡깡이 예술마을이 있는 곳이다. 깡깡이란 말은 수리 조선소에서 배 표면에 녹이 슬어 너덜해진 페인트나 조개껍데기를 망치로 두드려 벗겨낼 때 깡깡 소리가 난다 하여 생겨난 말이다. 마을 전체에 깡깡 소리가 그칠 날이 없었던 그 시절부터 대평동은 그렇게 깡깡이 예술마을로 불리게 되었다.이런 깡깡이 예술마을의 유래 때문인지 깡깡 소리를 내는 일꾼이 남성 기술자인 줄 알지만 전혀 아니다. 밧줄 하나에 몸을 의지한 채 오랜 세월 그 힘든 깡깡이질을 해낸 사람은 다름 아닌 대평동 깡깡이 아지매들이다. 자식에게만큼은 가난을 물려주지 않기 위해 난청과 이명을 이겨가며 묵묵히 조선소를 지킨 철의 여인들이다.조선소라고 해서 바다 냄새만 날 것 같고 깡깡 거리는 소리만 들릴 것 같다 생각할 수 있지만 깡깡이 예술마을은 마을 이름이 ‘예술마을’인 것을 보면 알 수 있듯 그 특색이 분명하다. 조선소의 기계 소리와 높이를 모르던 기계들이 즐비한 마을에, 몇 해 전부터 도시재생 프로젝트가 시작되었다. 깡깡이 예술마을 조성사업으로 예술가들이 마을 곳곳에 공공예술품을 설치하였으며 마을공작소, 생활문화센터, 마을투어, 유람선 체험, 선박 체험관 등의 시설을 통해 마을을 찾아주는 사람들과 소통을 시작했다.통합투어를 신청하면 마을해설사와 함께 생생한 골목길 투어를 즐길 수 있고 더불어 유람선 해상투어도 가능하다. 골목길을 접어 들 때마다 어떤 예술가의 작품이 있을지 찾아보는 재미 또한 쏠쏠하다. 마을 박물관에는 100여 년간의 축적된 수리 조선업에 관련된 이야기와 주민 생활상 등이 영상, 유물, 글, 예술작품 등 다양한 매체를 통해 한눈에 볼 수 있도록 전시되어 있다.‘부산’ 하면 해운대, 광안리도 있지만 부산원도심 스토리투어가 있는 영도에도 다양한 볼거리와 먹을거리, 즐길거리가 있고 그중 깡깡이예술마을과 같은 역사와 예술이 살아 숨 쉬는 마을도 있다. 부산 근대 문화의 현재진행형, 깡깡이예술마을의 살아있는 역사를 체험해 보자.",
    place_like: 0,
    restaurant_id: null,
    wish_list: null,
    hit: 7,
  },
];
const mockFestival = [
  // {
  //   festival_id: 330,
  //   main_title: "금정산성축제(한,영,중간,중번,일)",
  //   gugun_nm: null,
  //   lat: null,
  //   lng: null,
  //   place: null,
  //   title: null,
  //   subTitle: null,
  //   main_place: null,
  //   addr1: null,
  //   cntct_tel: null,
  //   homepage_url: null,
  //   trfc_info: null,
  //   usage_day_week_and_time: null,
  //   usage_amount: null,
  //   main_img_normal:
  //     "https://www.visitbusan.net/uploadImgs/files/cntnts/20191227115551778_ttiel",
  //   main_img_thumb: null,
  //   itemcntnts:
  //     "5월은 축제의 계절, 부산 금정구에서도 금정산성의 역사와 문화를 연계한 금정산성축제를 개최한다.전국 최장 길이 금정산성과 경치 좋은 산책길 온천천 일대에서 펼쳐지는 3일간의 문화예술 체험축제이다. 녹음이 우거진 금정산성 마을에서 즐기는 역사문화여행, 호패 하나 손에 쥐고 떠나는 오감만족 체험의 세계로 방문객을 초대한다.금정구 일원에서도 신나는 거리공연과 다양한 부대행사를 진행한다.5월엔 축제 프로그램 풍성한 금정산성으로 놀러가자!**2022 금정산성축제**2022.10.29.(토) ~ 2022.10.30.(일)※2023년 축제 일정 미정(확정 시 별도 공지)",
  //   middle_size_rm1: null,
  //   wish_list_fes: null,
  //   place_like: 0,
  //   hit: 66,
  //   liked: false,
  //   jjim: false,
  // },
  // {
  //   festival_id: 407,
  //   main_title: "동래읍성 역사축제(한, 영, 중간, 중번, 일)",
  //   gugun_nm: null,
  //   lat: null,
  //   lng: null,
  //   place: null,
  //   title: null,
  //   subTitle: null,
  //   main_place: null,
  //   addr1: null,
  //   cntct_tel: null,
  //   homepage_url: null,
  //   trfc_info: null,
  //   usage_day_week_and_time: null,
  //   usage_amount: null,
  //   main_img_normal:
  //     "https://www.visitbusan.net/uploadImgs/files/cntnts/20191230193142955_ttiel",
  //   main_img_thumb: null,
  //   itemcntnts:
  //     "10월은 축제의 달.부산 역시 수많은 축제가 우리를 기다리고 있지만, ‘역사’라는 명확한 테마를 가지고 20년이 훌쩍 넘게 동래의 대표 축제로 자리 잡은 ‘동래읍성 역사축제’는 청명한 가을에 만나기 딱 좋은 축제다.천여 명의 사람들이 함께 행렬을 꾸미는 ‘동래부사행차 길놀이’로 동래를 누비며 1592년 그 때로 돌아가는 타임머신, 동래읍성역사축제는 시작된다.동래읍성역사축제의 상징이라 할 수 있는 뮤지컬 ‘외로운 성’은 동래읍성 북문 앞마당에서 펼쳐지는 역사 뮤지컬이다. 1592년 임진왜란 당시 목숨을 걸고 동래읍성을 지키고자 했던 동래사람들의 모습을 생생하고 역동적인 뮤지컬로 함께할 수 있다. 비장한 모습의 배우들과 웅장한 노래는 관객으로 하여금 1592년의 동래로 돌아가 그 날의 뜨거움 속에 빠져들게 해준다.동래읍성의 야트막한 동산에서 열리는 축제 인만큼, 맑고 쾌청한 가을날 가족 나들이로 동래읍성역사축제를 찾은 사람들을 많이 만날 수 있다. 푸른 잔디와 파란 가을하늘을 배경삼아 동산에서 연을 날리는 아이들의 모습이 절로 미소를 짓게 해준다. 다양한 체험 프로그램도 빠질 수 없다. 아이들과 재미있게 역사를 배울 수 있는 체험코너가 많기에 즐거운 역사교육의 장으로 활용도가 꽤 높다.조선시대의 문화를 만날 수 있는 행사도 다양하다. 재미있는 이야기보따리를 흥겹게 풀어내는 이야기꾼 ‘전기수’를 만나보는 시간이 특색 있다. 멍석에 앉아 전기수의 말에 귀를 기울이며 울고 웃는 사람들의 모습에서 ‘아날로그 콘텐츠’를 경험하는 신기함을 느낄 수 있다.밧줄 위에서 자유롭게 뛰노는 ‘전통줄타기’도 흥미진진하다. 신나게 줄놀이 하는 어름산이를 따라 눈도 커졌다가, 입도 커졌다가, 조마조마했다가, 안도했다가, 보는 이들의 마음도 함께 널을 뛴다.머리 위로 늘어진 노란 소망등. 따뜻한 느낌의 소망터널에는 사람들의 크고 작은 소원이 가득하다. 가족과 친구의 행복을 비는 소원지가 저마다의 정성을 간직한 채 바람에 살랑거린다.흥겨운 사물놀이와 더불어 영차영차 서로를 응원하는 소리가 우렁차다. 하면 할수록 흥이 오르고 에너지가 터져 나오는 이 줄다리기의 이름은 동래세가닥줄다리기. 매년 재현되는 동래의 전통 민속놀이로, 승부를 겨루기보다는 사람들이 모두 모여 화합하는 잔치의 한마당이다.잊어서는 안 될 역사를 확실히 기억하고 널리 알리면서, 축제의 즐거움 또한 놓치지 않고 풍성하게 전해주는 동래읍성 역사축제로 가보자.**제29회 동래읍성 역사축제**2023.10.13.(금) ~ 10.15.(일)",
  //   middle_size_rm1: null,
  //   wish_list_fes: null,
  //   place_like: 0,
  //   hit: 64,
  //   liked: false,
  //   jjim: false,
  // },
  // {
  //   festival_id: 253,
  //   main_title: "수국축제(한,영,중간,중번,일)",
  //   gugun_nm: null,
  //   lat: null,
  //   lng: null,
  //   place: null,
  //   title: null,
  //   subTitle: null,
  //   main_place: null,
  //   addr1: null,
  //   cntct_tel: null,
  //   homepage_url: null,
  //   trfc_info: null,
  //   usage_day_week_and_time: null,
  //   usage_amount: null,
  //   main_img_normal:
  //     "https://www.visitbusan.net/uploadImgs/files/cntnts/20191222160520749_ttiel",
  //   main_img_thumb: null,
  //   itemcntnts:
  //     "본격적인 휴가철이 시작되기 전, 초여름의 부산에서 반드시 만나야할 축제가 있다.태종대에 위치한 사찰 태종사 일대에서 매년 6월 말 ~ 7월 초에 열리는 수국꽃문화축제가 바로 그 주인공이다. 태종대의 해안절경을 만끽하며 오색찬란한 수국을 제대로 즐길 수 있는 관광코스로도 유명하다.수국꽃문화축제가 열리는 태종사로 가는 방법은 두 가지다. 태종대를 즐기며 태종사까지 걷는 도보형, 그리고 다누비열차를 이용하는 다누비형이 있다. 수국 축제를 빨리 만나고 싶다면 다누비 열차를 타고 태종사 입구에 내려 아름다운 수국꽃길 걸으며 태종사로 오르면 된다. 걷기를 좋아하는 방문자라면 산책길을 따라 태종사까지 여유롭게 걸어보는 것도 좋겠다. 상쾌한 바닷바람 맞으며 천천히 걷다보면 수국꽃 흐트러진 태종사 입구가 여행자를 반긴다.태종사의 수국들은 주지스님께서 40여 년 동안 심고 가꾸어온 것이라 한다. 스님께서는 다양한 수국 모종을 구하기 위해 세계 곳곳을 돌며 발품을 팔았다고 한다. 현재 태종사 일대 수국의 종류가 30여 종, 총 5000여 그루에 달한다고 하니 그 규모가 엄청나다. 태종사 수국의 장관을 시민들과 함께 나누고픈 스님의 바람을 담아 2006년부터 수국꽃문화축제가 시작되었다.한국의 대표적인 수국 군락지로 유명한 태종사 일대는 매년 축제 기간이 되면 수국의 향연을 즐기려는 많은 사람들로 북적인다. 여기저기 터지는 셔터소리와 조용한 웃음소리, 그리고 활짝 핀 수국이 어우러져 또 다른 광경을 선사한다. 다채로운 색을 간직한 수국은 그 색깔에 따라 꽃말도 여러 개를 가지고 있다. 분홍색은 ‘진심 & 처녀의 꿈’, 청색은 ‘냉정’, 흰색은 ‘변덕’이라고 하니 다채로운 색깔만큼이나 다양한 꽃말이 재밌다. 축제 기간 중에는 냉면을 무료로 시식하는 ‘꽃밭냉면시식회’를 비롯, ‘꽃밭포토존’, ‘꽃밭버스킹’, ‘힐링숲길 산책로체험’ 등 다양한 프로그램이 준비되어 있으므로 일정표를 꼭 확인하여 축제를 알차게 즐겨 봐도 좋을 것이다.사랑하는 사람의 손을 잡고, 시원한 여름바람 맞으며 즐기는 오색찬란한 수국꽃밭. 작은 모종을 하나 둘 심어온 정성스러운 손길. 그 손길이 시간을 만나 이루어낸 놀라운 기적을 직접 만나보자.**축제 연기 안내**신종 코로나바이러스(코로나19) 감염 확산 방지를 위해 부산수국문화 축제는 연기되었음을 알려드립니다.(재개 시 별도 안내)",
  //   middle_size_rm1: null,
  //   wish_list_fes: null,
  //   place_like: 0,
  //   hit: 8,
  //   liked: false,
  //   jjim: false,
  // },
  // {
  //   festival_id: 403,
  //   main_title: "삼광사 연등축제(한,영,중간,중번,일)",
  //   gugun_nm: null,
  //   lat: null,
  //   lng: null,
  //   place: null,
  //   title: null,
  //   subTitle: null,
  //   main_place: null,
  //   addr1: null,
  //   cntct_tel: null,
  //   homepage_url: null,
  //   trfc_info: null,
  //   usage_day_week_and_time: null,
  //   usage_amount: null,
  //   main_img_normal:
  //     "https://www.visitbusan.net/uploadImgs/files/cntnts/20191230190338310_ttiel",
  //   main_img_thumb: null,
  //   itemcntnts:
  //     "부처님 오신 날을 전후로 새벽까지 환하게 연등을 밝히는 삼광사. 수를 셀 수 없는 수 만개의 연등이 백양산 자락을 수놓는다. 부처님의 지혜로 온 세상의 어둠을 밝히는 경이로운 축제다.연등터널이 만들어진 계단을 오를수록 현실을 벗어나 환상의 세계로 점점 빠져든다. 머리 위로 쏟아지는 수많은 불빛에 눈이 부시다. 경내 뒤편 가장 꼭대기로 오르면 삼광사의 연등 물결이 장관을 이룬다. 번뇌로 가득한 어두운 마음이 환해지는 것 같다.**2023년 축제 일정 미정(확정 시 별도 공지)",
  //   middle_size_rm1: null,
  //   wish_list_fes: null,
  //   place_like: 0,
  //   hit: 2,
  //   liked: false,
  //   jjim: false,
  // },
];
