CREATE TABLE member (
    member_id VARCHAR(20) PRIMARY KEY,
    password VARCHAR(20) NOT NULL,
    name VARCHAR(20) NOT NULL,
    birth DATE NOT NULL,
    phone_number VARCHAR(50) NOT NULL
);

CREATE TABLE review (
    review_id SERIAL PRIMARY KEY,
    member_id VARCHAR(20) REFERENCES member(member_id),
    title VARCHAR(100) NOT NULL,
    contents VARCHAR(4000) NOT NULL,
    hit INTEGER DEFAULT 0,
    review_like INTEGER DEFAULT 0,
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    review_place VARCHAR(50)
);

CREATE TABLE tourist_Spot (
    tourist_Spot_id SERIAL PRIMARY KEY,
    MAIN_TITLE VARCHAR(3000),
    GUGUN_NM VARCHAR(1000),
    LAT DECIMAL(8,6),
    LNG DECIMAL(8,5),
    PLACE VARCHAR(1000),
    TITLE VARCHAR(3000),
    SUBTITLE VARCHAR(4000),
    ADDR1 VARCHAR(4000),
    CNTCT_TEL VARCHAR(1000),
    HOMEPAGE_URL VARCHAR(4000),
    TRFC_INFO VARCHAR(4000),
    HLDY_INFO VARCHAR(1000),
    USAGE_DAY_WEEK_AND_TIME VARCHAR(1000),
    USAGE_AMOUNT VARCHAR(1000),
    MIDDLE_SIZE_RM1 VARCHAR(2000),
    MAIN_IMG_NORMAL VARCHAR(2000),
    MAIN_IMG_THUMB VARCHAR(2000),
    ITEMCNTNTS VARCHAR(4000),
    place_like INT DEFAULT 0,
    hit INT DEFAULT 0,
    wish_list INT DEFAULT 0
);


CREATE TABLE restaurant (
    restaurant_id SERIAL PRIMARY KEY,
    MAIN_TITLE VARCHAR(500),
    GUGUN_NM VARCHAR(500),
    LAT DECIMAL(8,6),
    LNG DECIMAL(8,5),
    TITLE VARCHAR(1000),
    ADDR1 VARCHAR(2000),
    CNTCT_TEL VARCHAR(100),
    USAGE_DAY_WEEK_AND_TIME VARCHAR(1000),
    RPRSNTV_MENU VARCHAR(1000),
    MAIN_IMG_NORMAL VARCHAR(2000),
    MAIN_IMG_THUMB VARCHAR(2000),
    ITEMCNTNTS VARCHAR(4000),
    hit INTEGER DEFAULT 0
);

CREATE TABLE festival (
    festival_id SERIAL PRIMARY KEY,
    MAIN_TITLE VARCHAR(500),
    GUGUN_NM VARCHAR(500),
    LAT DECIMAL(8,6),
    LNG DECIMAL(8,5),
    PLACE VARCHAR(500),
    TITLE VARCHAR(500),
    SUBTITLE VARCHAR(500),
    MAIN_PLACE VARCHAR(500),
    ADDR1 VARCHAR(2000),
    CNTCT_TEL VARCHAR(100),
    HOMEPAGE_URL VARCHAR(500),
    TRFC_INFO VARCHAR(1000),
    USAGE_DAY_WEEK_AND_TIME VARCHAR(1000),
    USAGE_AMOUNT VARCHAR(500),
    MAIN_IMG_NORMAL VARCHAR(2000),
    MAIN_IMG_THUMB VARCHAR(2000),
    ITEMCNTNTS VARCHAR(4000),
    MIDDLE_SIZE_RM1 VARCHAR(1000),
    place_like INTEGER DEFAULT 0 NOT NULL,
    hit INTEGER DEFAULT 0 NOT NULL,
    wish_list_fes INTEGER DEFAULT 0 NOT NULL
);

CREATE TABLE reply (
    reply_id SERIAL PRIMARY KEY,
    review_id INTEGER REFERENCES review(review_id),
    member_id VARCHAR(20) REFERENCES member(member_id),
    content VARCHAR(4000) NOT NULL,
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE course (
    course_id SERIAL PRIMARY KEY,
    course_set INTEGER,
    course_title VARCHAR(50) NOT NULL,
    course_sequense VARCHAR(1000) NOT NULL,
    course_content1 VARCHAR(2000) NOT NULL,
    course_content2 VARCHAR(2000) NOT NULL,
    course_content3 VARCHAR(2000) NOT NULL,
    course_content4 VARCHAR(2000) NOT NULL,
    course_content5 VARCHAR(2000) NOT NULL,
    hit INTEGER DEFAULT 0 NOT NULL,
    place_like INTEGER DEFAULT 0 NOT NULL,
    main_img VARCHAR(2000)
);

CREATE TABLE course_pic (
    course_pic_id SERIAL PRIMARY KEY,
    MAIN_IMG_NORMAL VARCHAR(2000),
    MAIN_TITLE VARCHAR(100),
    course_set INTEGER DEFAULT 0
);



CREATE TABLE review_img (
    img_id SERIAL PRIMARY KEY,
    review_id INTEGER REFERENCES review(review_id),
    original_filename VARCHAR(1000) NOT NULL,
    saved_filename VARCHAR(1000) NOT NULL,
    file_size VARCHAR(100) NOT NULL
);

CREATE TABLE wish_list_course (
    wishboard_id SERIAL PRIMARY KEY,
    member_id VARCHAR(20) REFERENCES member(member_id),
    course_id INTEGER REFERENCES course(course_id)
);

CREATE TABLE wish_list (
    wishboard_id SERIAL PRIMARY KEY,
    member_id VARCHAR(20) REFERENCES member(member_id),
    tourist_Spot_id INTEGER REFERENCES tourist_Spot(tourist_Spot_id)
);

CREATE TABLE wish_list_fes (
    wishboard_id SERIAL PRIMARY KEY,
    member_id VARCHAR(20) REFERENCES member(member_id),
    festival_id INTEGER REFERENCES festival(festival_id)
);

CREATE TABLE tourist_spot_likes (
    like_id SERIAL PRIMARY KEY,
    member_id VARCHAR(20) REFERENCES member(member_id),
    tourist_Spot_id INTEGER REFERENCES tourist_Spot(tourist_Spot_id)
);

CREATE TABLE festival_likes (
    like_id SERIAL PRIMARY KEY,
    member_id VARCHAR(20) REFERENCES member(member_id),
    festival_id INTEGER REFERENCES festival(festival_id)
);

CREATE TABLE course_likes (
    like_id SERIAL PRIMARY KEY,
    member_id VARCHAR(20) REFERENCES member(member_id),
    course_id INTEGER REFERENCES course(course_id)
);











