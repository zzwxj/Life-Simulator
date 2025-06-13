import { SystemConstantCfg } from "./Model/SystemConstantModel";

export class Constants {

    //动态加载预制体路径
    public static toastPath = 'Prefab/Popup/Common/toast';//提示路径
    public static monsterPath = 'Prefab/Game/Monster/MonsterPrefab';//怪物路径
    public static itemPath = 'Prefab/Game/Item/itemPrefab';//武器路径
    public static itemBgPath = 'Prefab/Game/Item/itemBgPrefab';//格子路径
    public static heroPath = 'Prefab/Game/Hero/heroItem';//英雄路径
    public static battSkillPath = 'Prefab/Game/Skill/skillBulletItem';//技能子弹路径
    public static battlePath = 'Prefab/Game/Battle/';//英雄路径
    public static synPath = 'Prefab/Game/Battle/synEffect';//英雄路径
    public static bulletItemPath = 'Prefab/Game/Bullet/';
    public static gameEffectPath = 'Prefab/Game/Effect/';
    public static areaItemPath = 'Prefab/Game/Area/';
    public static ItemPath = 'Prefab/Game/Area/';
    public static monsterPrefabPath = 'Prefab/Game/Monster/';//怪物预制体路径
    public static battleMapPath = 'Prefab/Game/Battle/BattleMapPrefab/';//战斗场景背景预制体路径
    public static levelMapPath = 'Prefab/Game/Battle/LevelMapPrefab/';//关卡入口背景预制体路径

    public static broadPrefabPath = 'Prefab/Game/Board/';//棋盘预制体路径

    public static skillSelectIconPath = 'Game/Skill/';//技能选择路径
    public static mapPath = 'Game/Map/';//地图路径
    public static itemImgPath = 'Game/Item/';//道具路径
    public static ItemIconPath = 'Game/ui/common/';//道具路径
    public static charUIPath = 'Game/char/';//个性化UI路径,需要加后缀补全
    public static gridPath = 'Game/Grid/';//格子路径
    public static monsterSpinePath = 'Spine/Monster/';//怪物资源路径
    public static monsterIconPath = 'Game/Monster/';//怪物资源路径
    public static monsterAnimPath = 'Anim/Monster/common/';//怪物资源路径
    public static chaterMapPath = 'Map/Chapter/';
    public static bgPath = 'Game/bg/';//背景资源路径
    public static uiPath = 'Game/ui/common/';//UI资源路径
    public static pingtaiPath = 'Game/pingtai/';//平台资源路径
    public static lootPath = 'Game/ui/loot/';//展览品资源路径
    
    public static effectSpinePath = 'Spine/Effect/';//特效资源路径
    public static uiSpinePath = 'Game/spine/';//特效资源路径

    public static SysConstant: { [key: string]: SystemConstantCfg } = {};
    //配置数据
    public static ConfigPath = 'ConfigData/'
    public static selectLoadConfig: Array<string> = [];//选择加载配置

    //音频文件下分类
    public static AUDIO_FILE_PATH = {
        MUSIC: 'Game/audio/Music/',//bgm
        SOUND: 'Game/audio/Sound/',//音效
    }

    //动态预制体路径(rollhero项目需要的)
    public static equipmentPath = 'Prefab/Game/Equipment/Equipment';//装备
    public static BattleHeroItemPath = 'Prefab/Game/Hero/Hero';
    public static BattleEnemyItemPath = 'Prefab/Game/Enemy/';
    public static BattleHitEffectPath = 'Prefab/Game/Battle/';//战斗特效或者一些预制体所在目录
    public static FriendSelectCellPath = 'Prefab/Game/Friend/friendSelectCell';
    public static FriendItemPath = 'Prefab/Game/Friend/';
    public static bgStagePath = 'Game/bg/stage/';//背景资源路径
    public static friendSkillBubblePath = 'Prefab/Game/Friend/friendSkillBubble';
    public static awardCellPath = 'Prefab/Popup/Common/AwardCell';
    public static gridItemPath = 'Prefab/Popup/Game/gameGridItem';
    public static gridWallPath = 'Prefab/Popup/Game/gameGridWall';

    //动态资源路径(rollhero项目需要的)
    public static qualityPath = 'Game/ui/common/';//品质路径
    public static equipIconPath = 'Game/icon/equip/';
    public static friendIconPath = 'Game/friend/';
    public static itemIconPath = 'Game/icon/item/';
    public static stagePath = 'Game/ui/stage/';
    public static friendUiPath = 'Game/ui/friend/';
    public static blessIconPath = 'Game/icon/bless/';
    public static friendDicePath = 'Game/ui/freindDice/';
    public static cubePath = 'Game/ui/cube/';
    public static hangingsIconPath = 'Game/icon/hangings/';

    //弹窗
    public static PopupUI = {
        ChapterPopup: "Prefab/Popup/Chapter/chapterPopup",//章节界面
        GamePopup: "Prefab/Popup/Game/gamePopup",//游戏界面
        GameResultPopup: "Prefab/Popup/Game/gameResultPopup",//游戏jiesuan界面
        GameRevivalPopup: "Prefab/Popup/Game/gameRevivalPopup",
        GameMainMap: "Prefab/Popup/Game/gameMainMap",//上下边栏
        SetPopup: "Prefab/Popup/Set/setPopup",//设置界面
        SkillSelectPopup: "Prefab/Popup/Skill/skillSelectPopup",//技能选择界面
        GameChooseBuffPopup: "Prefab/Popup/Game/gameChooseBuffPopup",//buff选择界面
        GameItemInfoPopup: "Prefab/Popup/Game/gameItemInfoPopup",//装备信息界面
        GameShopPopup: "Prefab/Popup/Game/gameShopPopup",//商城界面
        GameAwardPopup: "Prefab/Popup/Game/gameAwardPopup",//游戏奖励界面
        GameAwardFriendPopup: "Prefab/Popup/Game/gameAwardFriendPopup",//

        SettingPopup: "Prefab/Popup/Game/settingPopup",//设置界面
        RedeemCodePopup: "Prefab/Popup/Game/redeemCodePopup",//兑换码界面
        SevenDayPopUp: "Prefab/Popup/Game/sevenDayPopup",//七日界面
        GameMainPopup: "Prefab/Popup/Game/gameMainPopup",//游戏主界面
        GameLoadPopup: "Prefab/Popup/Game/gameLoadPopup",//游戏加载界面
        GameGachaPopup:"Prefab/Popup/Game/gameGachaPopup",//开启宝箱界面
        GameGachaResultPopup:"Prefab/Popup/Game/gameGachaResultPopup",//开启宝箱结果界面
        GameGachaLevelInfoPopup:"Prefab/Popup/Game/gameGachaLevelInfoPopup",//宝箱概率界面
        GameGachaLevelUpPopup:"Prefab/Popup/Game/gameGachaLevelUpPopup",//宝箱升级界面
        GameNewFunctionPopup:"Prefab/Popup/Game/gameNewFunctionPopup",//新功能开启界面
        GameBountyPopup:"Prefab/Popup/Game/gameBountyPopup",//悬赏界面
        OnlineRewardPopup: "Prefab/Popup/Game/onlineRewardPopup",//在线奖励界面
        //MilesRewardPopup: "Prefab/Popup/Game/milesRewardPopup",//累计奖励界面
        StageRewardPopup: "Prefab/Popup/Game/stageRewardPopup",//航程豪礼界面
        VitalityPurchasePopup: "Prefab/Popup/Game/vitalityPurchasePopup",//体力购买界面
        VitalityReceivePopup: "Prefab/Popup/Game/vitalityReceivePopup",//体力领取界面
        GameRougeBuffPopup: "Prefab/Popup/Game/gameRougeBuffPopup",//
        GameDamageCalculatePopup: "Prefab/Popup/Game/gameDamageCalculatePopup",//
        GameMaskView: "Prefab/Popup/Game/gameMaskView",//
        TaskDailyPopup: "Prefab/Popup/Game/taskDailyPopup",//每日任务界面
        GameTalentPopup: "Prefab/Popup/Game/gameTalentPopup",//天赋界面
        GameUserTipPopup: "Prefab/Popup/Game/gameUserTipPopup",//用户隐私条款界面
        HangPopup: "Prefab/Popup/Game/hangPopup",//挂机界面
        GameRankListPopup:"Prefab/Popup/Game/gameRankListPopup",//排行榜
        GameProfilePopup:"Prefab/Popup/Game/gameProfilePopup",//头像选择界面
        GameTipPopup:"Prefab/Popup/Game/gameTipPopup",//游戏内提示框
        GameGuidePopup:"Prefab/Popup/Game/gameGuidePopup",//引导层
        GameChapterChatPopup:"Prefab/Popup/Game/gameChapterChatPopup",//引导对话
        GameLibaoPopup:"Prefab/Popup/Game/gameLiBaoPopup",//礼包界面

        NoticeMail:"Prefab/Popup/Game/NoticeMail",//首次邮件提示奖励界面
        
        BoardStartPointPopup:"Prefab/Popup/Board/boardStartPointPopup",//起点信息提示弹窗
        BoardHealingPopup:"Prefab/Popup/Board/boardHealingPopup",//获得治疗瓶弹窗
        BoardArmWrestlingPopup:"Prefab/Popup/Board/boardArmWrestlingPopup",//豪腕挑战弹窗
        BoardTreasurePopup:"Prefab/Popup/Board/boardTreasurePopup",//骨头堆弹窗
        BoardForgePopup:"Prefab/Popup/Board/boardForgePopup",//铁匠铺
        BoardCardPopup:"Prefab/Popup/Board/boardCardPopup",//欺诈者
        BoardDicePopup:"Prefab/Popup/Board/boardDicePopup",//骰子对决
        BoardSmelterPopup:"Prefab/Popup/Board/boardSmelterPopup",//地狱熔炉
        BoardJailPopup:"Prefab/Popup/Board/boardJailPopup",//牢狱
        BoardRaceResultPopup:"Prefab/Popup/Board/boardRaceResultPopup",//竞速
        BoardShopPopup:"Prefab/Popup/Board/boardShopPopup",//商店
        BoardBlessPopup:"Prefab/Popup/Board/boardBlessPopup",//祝福三选一
        BoardAwardPopup:"Prefab/Popup/Board/boardAwardPopup",//获得奖励弹窗
        BoardChestEventPopup:"Prefab/Popup/Board/boardChestEventPopup",//
        BoardEventInfoTip:"Prefab/Popup/Board/boardEventInfoTip",//格子信息
        BoardPasswordPopup:"Prefab/Popup/Board/boardPasswordPopup",//密码弹窗
        BoardDiceRevivePopup:"Prefab/Popup/Board/boardDiceRevivePopup",//骰子复活弹窗
        BoardAnyDicePopup:"Prefab/Popup/Board/boardAnyDicePopup",//任意骰使用弹窗
        BoardStandByPopup:"Prefab/Popup/Board/boardStandByPopup",//战斗准备弹窗
        BoardHouseProcessPopup:"Prefab/Popup/Board/boardHouseProcessPopup",//方尖碑建成进度弹窗
        BoardHouseTaskAwardPopup:"Prefab/Popup/Board/boardHouseTaskAwardPopup",//方尖碑建成奖励弹窗
        GameNatureLevelPopup:"Prefab/Popup/Game/gameNatureLevelPopup",
        GameFriendPopup: "Prefab/Popup/Game/gameFriendPopup",//宠物界面
        GameFriendInfoPopup: "Prefab/Popup/Game/gameFriendInfoPopup",//宠物信息界面
        GameFriendGachaPopup: "Prefab/Popup/Game/gameFriendGachaPopup",//宠物抽卡
        GameFriendGachaTipView: "Prefab/Popup/Game/gameFriendGachaTipView",//抽卡解雇
        GameFriendDicePopup: "Prefab/Popup/Game/gameFriendDicePopup",//约会
        BoardBattleEventPopup:"Prefab/Popup/Board/boardBattleEventPopup",
        GameGridBattlePopup:"Prefab/Popup/Game/gameGridBattlePopup",
        GameExhibitionPopup:"Prefab/Popup/Game/gameExhibitionPopup",
        GameVotePopup:"Prefab/Popup/Game/gameVotePopup",
        GameNewLootPopup:"Prefab/Popup/Game/gameNewLootPopup",
        GMPopup:"Prefab/Popup/Game/gmPopup",
        SidebarAward: "Prefab/Popup/Game/sidebarAward",//侧边栏奖励
    }

    //数据存储
    public static cacheVersion = 'cacheVersion';
    public static gameConfigId = 'gameData';//游戏数据
    public static playerConfigId = 'playerData';//玩家数据
    public static cacheVersionConfig = [
        { 'versionName': 'gameData', 'version': 1.03 },
        { 'versionName': 'playerData', 'version': 1.01 },
    ];
}


