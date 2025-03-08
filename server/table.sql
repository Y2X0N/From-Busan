select * from tourist_spot_likes;

select place_like from festival;

drop table restaurant;

create sequence seq_review ;

commit;

create table tourist_Spot(
tourist_Spot_id number primary key,
MAIN_TITLE varchar2(3000) ,
GUGUN_NM varchar2(1000) ,
LAT decimal(8,6)  ,
LNG decimal(8,5)  ,
PLACE varchar2(1000)  ,
TITLE varchar2(3000)  ,
SUBTITLE varchar2(4000)  ,
ADDR1 varchar2(4000)  ,
CNTCT_TEL varchar2(1000)  ,
HOMEPAGE_URL varchar2(4000)  ,
TRFC_INFO varchar2(4000)  ,
HLDY_INFO varchar2(1000)  ,
USAGE_DAY_WEEK_AND_TIME varchar2(1000)  ,
USAGE_AMOUNT varchar2(1000)  ,
MIDDLE_SIZE_RM1 varchar2(2000)  ,
MAIN_IMG_NORMAL varchar2(2000)  ,
MAIN_IMG_THUMB varchar2(2000)  ,
ITEMCNTNTS varchar2(4000),
place_like number default 0,
hit number default 0,
wish_list number default 0
);
alter table tourist_Spot  modify wish_list number default 0 not null;
drop table restaurant cascade constraints;

select seq_member   .currval from dual;


select * from restaurant;

create table restaurant(
restaurant_id number primary key,
MAIN_TITLE varchar2(500) ,
GUGUN_NM varchar2(500) ,
LAT decimal(8,6)  ,
LNG decimal(8,5)  ,
TITLE varchar2(1000)  ,
ADDR1 varchar2(2000)  ,
CNTCT_TEL varchar2(100)  ,
USAGE_DAY_WEEK_AND_TIME varchar2(1000)  ,
RPRSNTV_MENU varchar2(1000)  ,
MAIN_IMG_NORMAL varchar2(2000)  ,
MAIN_IMG_THUMB varchar2(2000)  ,
ITEMCNTNTS varchar2(4000),
hit number default 0

);
drop table festival cascade constraints;

create table festival(
festival_id number primary key,
MAIN_TITLE varchar2(500) ,
GUGUN_NM varchar2(500) ,
LAT decimal(8,6)  ,
LNG decimal(8,5)  ,
PLACE varchar2(500)  ,
TITLE varchar2(500)  ,
SUBTITLE varchar2(500)  ,
MAIN_PLACE varchar2(500)  ,
ADDR1 varchar2(2000)  ,
CNTCT_TEL varchar2(100)  ,
HOMEPAGE_URL varchar2(500)  ,
TRFC_INFO varchar2(1000)  ,
USAGE_DAY_WEEK_AND_TIME varchar2(1000)  ,
USAGE_AMOUNT varchar2(500)  ,
MAIN_IMG_NORMAL varchar2(2000)  ,
MAIN_IMG_THUMB varchar2(2000)  ,
ITEMCNTNTS varchar2(4000)  ,
MIDDLE_SIZE_RM1 varchar2(1000) ,
place_like number default 0 not null,
hit number default 0 not null,
wish_list_fes number default 0 not null
);

select wish_list_fes from festival;
alter table festival  modify wish_list_fes number default 0 not null;

commit;
---------------------------------------------------------------------------------

create table reply(
    reply_id number primary key,
    review_id number references review(review_id),
    member_id varchar2(20) references member(member_id),
    content varchar2(4000) not null,
    created_time date default sysdate
);
drop table course cascade constraints;

---------------------------------------------------------------------------------
create table course (
    course_id number primary key ,
    course_set number ,
    course_title varchar2(50) not null,
    course_sequense varchar2(1000) not null,
    course_content1 varchar2(2000) not null,
    course_content2 varchar2(2000) not null,
    course_content3 varchar2(2000) not null,
    course_content4 varchar2(2000) not null,
    course_content5 varchar2(2000) not null,
    hit number default 0 not null,
    place_like number default 0 not null,
    main_img varchar2(2000)
);
select * from course;
drop table course cascade constraints;

create table course_pic(
    course_pic_id number primary key,
    MAIN_IMG_NORMAL varchar2(2000) ,
    MAIN_TITLE varchar2(100) ,
    course_set number default 0
);
drop table course_pic cascade constraints;
commit;

---------------------------------------------------------------------------------

create table member(
    member_id varchar2(20) primary key,
    password varchar2(20) not null,
    name varchar2(20) not null,
    birth date not null,
    phone_number varchar2(50) not null
);

---------------------------------------------------------------------------------
create table review(
    review_id number primary key,
    member_id varchar2(20) REFERENCES member(member_id),
    title varchar2(100) not null,
    contents varchar2(4000) not null,
    hit number default 0,
    review_like number default 0,
    created_time date default sysdate,
    review_place varchar(50)
    );
select * from review;
drop table wish_list_course cascade constraints;

alter table review add review_place varchar(50); 
drop table review_img;
select * from review_img;
create table review_img(
    img_id number primary key,
    review_id number REFERENCES review(review_id),
    original_filename varchar2(1000) not null,
    saved_filename varchar2(1000) not null,
    file_size varchar2(100) not null
);
commit;
select * from review_img where review_id =15 and original_filename='1111.jpg';



---------------------------------------------------------------------------------
create table wish_list_course(
    wishboard_id number primary key,
    member_id varchar2(20) REFERENCES member(member_id),
    course_id number REFERENCES course(course_id)
);
drop table wish_list_course;
ALTER TABLE wish_list_course RENAME column course_set_id to course_id;
    
create table wish_list(
    wishboard_id number primary key,
    member_id varchar2(20) references member(member_id),
    tourist_Spot_id number references tourist_Spot(tourist_Spot_id)
);
select * from wish_list;

create table wish_list_fes(
    wishboard_id number primary key,
    member_id varchar2(20) references member(member_id),
    festival_id number references festival(festival_id)
);

select * from wish_list_fes;

---------------------------------------------------------------------------------

create table tourist_spot_likes(
    like_id number primary key,
    member_id varchar2(20) references member(member_id),
    tourist_Spot_id number references tourist_Spot(tourist_Spot_id)
);
create table festival_likes(
    like_id number primary key,
    member_id varchar2(20) references member(member_id),
    festival_id number references festival(festival_id)
);
create table course_likes(
    like_id number primary key,
    member_id varchar2(20) references member(member_id),
    course_id number references course(course_id)
);


select * from tab;
commit;

