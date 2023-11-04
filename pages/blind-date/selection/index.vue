<template>
  <div v-if="isShow" id="SelectionPage">
    <section class="top">
      <div v-if="! isOpenBlindPopup" class="m-close">
        <img
          class="m-back-btn"
          src="@/assets/img/common/close-btn2.png"
          alt=""
          @click="$router.push('/')"
        />
      </div>
      <div class="title">
        <p>이번 한대소에서</p>
        <p>만나고 싶은 상대는?</p>
      </div>
      <div class="description">
        <div v-if="isSelected">
          중복참여 불가, 둘 중 하나만 참여 가능
        </div>
        <div v-else>
          중복참여 불가
        </div>
      </div>
    </section>
    <section class="middle">
      <div 
        :class="{'active' : isBlindActive, 'disabled' : isFriendActive && isSelected }"
        class="box"
        @click.prevent="selectBlindDate">
          <div>
            <p class="sub-text">두근두근</p>
            <p class="main-text">연애</p>
          </div>
      </div>

      <div 
      :class="{'active' : isFriendActive, 'disabled' : isBlindActive && isSelected }"
        class="box" 
        @click.prevent="selectFriendMeeting">
          <div>
            <p class="sub-text">우리 친구 할래요?</p>
            <p class="main-text">친구사이</p>
          </div>
      </div>
    </section>
    <section class="bottom">
      <div class="footer">
        <a
          :class="isSelected ? 'active' : ''"
          class="home-btn"
          target="_blank"
          style="text-decoration: none"
          @click.prevent = "commit"
        >
          확인
        </a>
      </div>
    </section>

    <!-- 약관 동의 화면 -->
    <div
      v-if="isOpenBlindPopup"
      class="blind-popup"
      @click.self="isOpenBlindPopup = false"
    >
      <div class="content-wrp">
        <div class="m-close">
          <img
            class="m-back-btn"
            src="@/assets/img/common/close-btn2.png"
            alt=""
            @click="isOpenBlindPopup = false"
          />
        </div>

        <section class="popup-top">
          <div class="title">
            <p class="line1">한대소</p>
            <p class="line2">약관동의</p>
          </div>
        </section>
        
        <div class="popup-middle">
          <div class="desc">
            <div class="block1">
              <p>이번 한대소에서는 저번 시즌 후 진행된 설문조사 내용에 따라 아래의 내용을 모두 확인 후 동의합니다.</p>
            </div>
            
            <div class="block2">
              <p>﹒양측 카카오 링크 오픈</p>
              <p>﹒재매칭 제도</p>
              <p>﹒책임감을 위한 보증금 납부</p>
              <p>﹒매칭 리뷰에 따른 다음 시즌 참여 불가 패널티</p>
              <p>﹒채팅방 입장 안할 시 다음 시즌 참여 불가 패널티</p>
              <p>﹒본인 사진 최소 1장 필수</p>
            </div>
          </div>
        </div>
        

        <div class="popup-bottom">
          <div class="check-box">
            <div class="icon" @click.prevent="clickBlindCheckBox">
              <img
                :class="getIsBlindCheckedContract ? '' : 'disabled'"
                class="check-box-img"
                src='@/assets/img/blind-date/check-box-selected.png'
                alt=""
                />
              <img
              :class="getIsBlindCheckedContract ? 'disabled' : ''"
                class="check-box-img"
                src='@/assets/img/blind-date/check-box.png'
                alt=""
              />
            </div>
            <div class="text">
              매너 있는 한대소를 위한 약관을 잘 읽고 보았고, 동의합니다. <span class="red">(필수)</span>
            </div>
          </div>
          <div 
            :class="getIsBlindCheckedContract ? 'isChecked' : ''"
            class="btn" 
            @click.prevent="aggreeBlindContract">
            동의
          </div>
        </div>
      </div>
    </div>


    <div
      v-if="isOpenFriendPopup"
      class="friend-popup"
      @click.self="isOpenFriendPopup = false"
    >
      <div class="content-wrp">
        <div class="m-close">
          <img
            class="m-back-btn"
            src="@/assets/img/common/close-btn2.png"
            alt=""
            @click="isOpenFriendPopup = false"
          />
        </div>

        <section class="popup-top">
          <div class="title">
            <p class="line1">한대소</p>
            <p class="line2">약관동의</p>
          </div>
        </section>
        
        <div class="popup-middle">
          <div class="desc">
            <div class="block1">
              <p>이번 한대소에서는 저번 시즌 후 진행된 설문조사 내용에 따라 아래의 내용을 모두 확인 후 동의합니다.</p>
            </div>
            
            <div class="block2">
              <p>﹒양측 카카오 링크 오픈</p>
              <p>﹒재매칭 제도</p>
              <p>﹒매칭 리뷰에 따른 다음 시즌 참여 불가 패널티</p>
              <p>﹒채팅방 입장 안할 시 다음 시즌 참여 불가 패널티</p>
            </div>
          </div>
        </div>
        

        <div class="popup-bottom">
          <div class="check-box">
            <div class="icon" @click.prevent="clickFriendCheckBox">
              <img
                :class="getIsFriendCheckedContract ? '' : 'disabled'"
                class="check-box-img"
                src='@/assets/img/blind-date/check-box-selected.png'
                alt=""
                />
              <img
              :class="getIsFriendCheckedContract ? 'disabled' : ''"
                class="check-box-img"
                src='@/assets/img/blind-date/check-box.png'
                alt=""
              />
            </div>
            <div class="text">
              매너 있는 한대소를 위한 약관을 잘 읽고 보았고, 동의합니다. <span class="red">(필수)</span>
            </div>
          </div>
          <div 
            :class="getIsFriendCheckedContract ? 'isChecked' : ''"
            class="btn" 
            @click.prevent="aggreeFriendContract">
            동의
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectionPage',
  components: {},
  data() {
    return {
      isShow: true,
      isEnabledBlind: false,
      isEnabledFriend: false,
      isSelected: false,
      isBlindActive: false,
      isFriendActive: false,
      isOpenBlindPopup: false,
      isOpenFriendPopup: false,
      isBlindCheckedContract: false,
      isFriendCheckedContract: false
    }
  },
  computed: {
    getIsBlindCheckedContract() {
      return this.isBlindCheckedContract
    },
    getIsFriendCheckedContract() {
      return this.isFriendCheckedContract
    },
  },
  watch: {},
  mounted() {
    // 진입 시점 (연애탭 or 친구탭)참여여부 체크
    this.cmn_getBlindOrFriendParticipation().then((res) => {
      if (res) {
        this.$router.push('/blind-date/proceeding')
      } else {
        this.isShow = res;
      }
    })
  },
  methods: {
    // 연애 탭 선택
    selectBlindDate() {
      if (! this.isFriendActive) {
        this.isBlindActive = !this.isBlindActive;
        this.isFriendActive = false;
        if (this.isBlindActive) {
          this.isSelected = true;  
        } else {
          this.isSelected = false;
        }
      }
    },
    // 친구 탭 선택
    selectFriendMeeting() {
      if (! this.isBlindActive) {
        this.isBlindActive = false;
        this.isFriendActive = !this.isFriendActive;
        if (this.isFriendActive) {
          this.isSelected = true;  
        } else {
          this.isSelected = false;
        }
      }
    },
    // 선택한 탭 진행
    commit() {
      if (this.isSelected) {
        if (this.isBlindActive) {
          this.isOpenBlindPopup = true;
          this.isBlindCheckedContract = false;
        } else if (this.isFriendActive) {
          this.isOpenFriendPopup = true;
          this.isFriendCheckedContract = false;
        }
      }
    },
    // 연애 탭 약관 체크
    clickBlindCheckBox() {
      this.isBlindCheckedContract = !this.isBlindCheckedContract;
    },
    // 친구 탭 약관 체크
    clickFriendCheckBox() {
      this.isFriendCheckedContract = !this.isFriendCheckedContract;
    },
    // 연애 탭 약관 제출
    aggreeBlindContract() {
      if (this.isBlindCheckedContract) {
        console.log("계좌번호 제출 페이지 이동");
      }
    },
    // 친구 탭 약관 제출
    aggreeFriendContract() {
      if (this.isFriendCheckedContract) {
        console.log("친구 만남 신청 페이지 이동");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blind-date/selection.scss';
</style>
