import { instantiate, Node, Prefab, v3, Vec3 } from "cc";
import { Constants } from "../Constants";
import { SelectObj } from "../Game/Data/SkillUpgradeData";
import { ItemCfg } from "../Model/ItemModel";
import { Toast } from "../Popup/Common/Toast";
import GameController from "./GameController";
import { PopupManager, PopupOptions } from "./PopupManager";
import { ResourcesUtil } from "./ResourcesUtil";
import { RewardItemObj } from "../Game/Reward/RewardItem";
import { ReadinessObj, RewardObj } from "../Game/Data/ItemData";
import { Util } from "./Util";
import { MaskViewOption } from "../Popup/Game/GameMaskView";
import { EventListener } from "./EventListener";
import { GameEvent } from "../Game/Event/GameEvent";
import { BagType } from "../Game/Data/PlayerData";
import { GameNewFunctionPopup } from "../Popup/Game/GameNewFunctionPopup";
import { FriendData, FriendObj } from "../Game/Data/FriendData";
import { BoardItemBase } from "../Game/Board/BoardItemBase";

export class OpenPopupManager {
    public TopLayer: Node = null; //弹窗上层
    public MidLayer: Node = null;//弹窗中层
    public BottomLayer: Node = null;//弹窗下层
    public ToastLayer: Node = null;//弹窗提示层


    /* 显示队列弹窗 */
    showSeqPopup(path: string, parentPath: string, param?: any, callBack?: Function) {
        let options = new PopupOptions();
        options.path = path;
        options.parent = this.TopLayer;
        PopupManager.instance.pushToPopupSeq(options, param, callBack);
    }

    /* 关闭队列弹窗 */
    hideSeqPopup(path: string, callBack?: Function) {
        PopupManager.instance.shiftFromPopupSeq(path, callBack);
    }

    /* 添加需要被动关闭的窗口 */
    addHidePopup(path: string) {
        PopupManager.instance.addHidePopup(path);
    }

    /* 显示用户须知界面*/
    showUserTipPopup(callBack: (agree: boolean) => void){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameUserTipPopup;
        options.parent = this.MidLayer;
        PopupManager.instance.show(options, [callBack]);
    }

    /* 上下边栏 */
    showMainMap(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameMainMap;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    /* ondate界面 */
    showFriendDice(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameFriendDicePopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    /* 显示章节界面 */
    showChapterPopup(parent: Node) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.ChapterPopup;
        options.parent = parent;
        PopupManager.instance.show(options)
    }

    /* 显示战斗弹窗 */
    showGamePopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GamePopup;
        options.parent = this.MidLayer;
        options.closeCur = true;
        PopupManager.instance.show(options);
    }

    /* 显示战斗结束弹窗 */
    showGameResultPopup(status: number) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameResultPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options, [status]);
    }

    showGameRevivalPopup(cbk:Function){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameRevivalPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[cbk]);
    }

    /* 显示武器详情 */
    showItemDetailPopup(itemCfg: ItemCfg) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameItemInfoPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[itemCfg]);
    }

    /* 侧边栏奖励界面 */
    showSidebarAwardPopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.SidebarAward;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    /* 显示7r界面 */
    showSevenDaysPopup(checkCallback: () => void) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.SevenDayPopUp;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options, [checkCallback]);
    }

    showHangPopup(checkCallback: () => void){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.HangPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options, [checkCallback]);
    }

    showRougeBuffPopup(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameRougeBuffPopup;
        options.parent = this.MidLayer;
        PopupManager.instance.show(options);
    }

    showDamageCalulatePopup(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameDamageCalculatePopup;
        options.parent = this.MidLayer;
        PopupManager.instance.show(options);
    }

    /* 显示开启宝箱界面 */
    showGachaPopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameGachaPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    /* 显示开启宝箱结果界面 */
    showGachaResultPopup(rewardList: RewardObj[],chestType: number,cbk:Function) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameGachaResultPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[rewardList,chestType,cbk]);
    }

    /* 显示开启宝箱结果界面 */
    showGachaLevelInfoPopup(level: number) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameGachaLevelInfoPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[level]);
    }

    /* 显示开启宝箱升级界面 */
    showGachaLevelUpPopup(level: number) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameGachaLevelUpPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[level]);
    }

    /* 显示新功能开启界面 */
    showNewFunctionPopup(action: (self: GameNewFunctionPopup) => void) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameNewFunctionPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[action]);
    }

    showLibaoPopup(page:number=0){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameLibaoPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[page]);
    }

    showFirstMailPopup(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.NoticeMail;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    /* 显示在线奖励界面 */
    showOnlineRewardPopup(checkCallback: () => void) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.OnlineRewardPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options, [checkCallback]);
    }

    // /* 显示累计奖励界面 */
    // showMilesRewardPopup(checkCallback: () => void) {
    //     let options = new PopupOptions();
    //     options.path = Constants.PopupUI.MilesRewardPopup;
    //     options.parent = this.TopLayer;
    //     PopupManager.instance.show(options, [checkCallback]);
    // }

    /* 显示每日任务界面 */
    showTaskDailyRewardPopup(checkCallback: () => void) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.TaskDailyPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options, [checkCallback]);
    }

    /* 显示航程豪礼界面 */
    showStageRewardPopup(checkCallback: () => void) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.StageRewardPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options, [checkCallback]);
    }

    /* 显示体力购买界面 */
    showVitalityPurchasePopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.VitalityPurchasePopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    /* 显示体力领取界面 */
    showVitalityReceivePopup(checkCallback: () => void) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.VitalityReceivePopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[checkCallback]);
    }

    /* 显示悬赏界面 */
    showBountyPopup(cbk: Function = null) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameBountyPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[cbk]);
    }

    /* 显示排行榜界面 */
    showRankListPopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameRankListPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    /* 弹出选择buff界面 */
    showChooseBuffPopup(level:number,closeCbk:Function) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameChooseBuffPopup;
        options.parent = this.MidLayer;
        GameController.pause();
        PopupManager.instance.show(options,[level,closeCbk]);
    }

    /*头像选择界面 */
    showProfilePopup(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameProfilePopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    /*通用奖励界面*/
    showAwardPopup(awardList: {}[],cbk: Function = null) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameAwardPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[awardList,cbk]);
    }

    showAwardFriendPopup(awardList: {}[],cbk: Function = null) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameAwardFriendPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[awardList,cbk]);
    }

    /* 显示商城界面 */
    showShopPopup(shineCode: BagType) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameShopPopup;
        options.parent = this.MidLayer;
        options.closeCur = true;
        PopupManager.instance.show(options, [shineCode]);
        this.addHidePopup(options.path);

        EventListener.emit(GameEvent.UPDATE_MAIN_BOTTOM, 0);
    }

    /* 显示基本属性养成界面 */
    showHeroNaturePopup(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameNatureLevelPopup;
        options.parent = this.MidLayer;
        options.closeCur = true;
        PopupManager.instance.show(options);
        this.addHidePopup(options.path);

        EventListener.emit(GameEvent.UPDATE_MAIN_BOTTOM, 1);
    }

    /* 显示主界面 */
    showMainPopup(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameMainPopup;
        options.parent = this.MidLayer;
        options.closeCur = true;
        PopupManager.instance.show(options);
        this.addHidePopup(options.path);

        EventListener.emit(GameEvent.UPDATE_MAIN_BOTTOM, 2);
    }

    /* 显示好友界面 */
    showFriendPopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameFriendPopup;
        options.parent = this.MidLayer;
        options.closeCur = true;
        PopupManager.instance.show(options);
        this.addHidePopup(options.path);

        EventListener.emit(GameEvent.UPDATE_MAIN_BOTTOM, 3);
    }

    /** 显示伙伴抽卡界面 */
    showFriendGachaPopup(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameFriendGachaPopup;
        options.parent = this.MidLayer;
        options.closeCur = true;
        PopupManager.instance.show(options);
        this.addHidePopup(options.path);

        EventListener.emit(GameEvent.UPDATE_MAIN_BOTTOM, 4);
    }

    /* 显示天赋界面 */
    showTalentPopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameTalentPopup;
        options.parent = this.MidLayer;
        options.closeCur = true;
        PopupManager.instance.show(options);
        this.addHidePopup(options.path);

        EventListener.emit(GameEvent.UPDATE_MAIN_BOTTOM, 4);
    }

    showGameMaskPopup(maskOption:MaskViewOption){
        let options = new PopupOptions;
        options.path = Constants.PopupUI.GameMaskView;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[maskOption]);
    }

    setToplayerNode(node:Node,oldNode:Node){
        node.parent = this.TopLayer;
        node.position = Util.calculateASpaceToBSpacePos(oldNode,this.TopLayer,v3(0,0,0));
    }

    showFriendInfoPopup(obj:FriendObj){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameFriendInfoPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[obj]);
    }

    /* 显示设置界面 */
    showSettingPopup(isInBattle: boolean) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.SettingPopup;
        options.parent = this.TopLayer;
        if(isInBattle){
            GameController.pause();
        }
        PopupManager.instance.show(options,[isInBattle]);
    }

    /* 显示兑换码界面 */
    showRedeemCodePopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.RedeemCodePopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    /* 显示游戏提示界面 */
    showGameFriendGachaTipView(list: number[],callback: Function) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameFriendGachaTipView;
        options.parent = this.TopLayer;
        FriendData.instance.getNewFriend(list);
        PopupManager.instance.show(options,[list,callback]);
    }

    /* 显示游戏提示界面 */
    showGameTipPopup(tipType: number,callback: Function,callBack1: Function = null) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameTipPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[tipType,callback,callBack1]);
    }

    closeBattlePopup(){
        if(PopupManager.instance.isDialogVisible(Constants.PopupUI.GameDamageCalculatePopup)){
            PopupManager.instance.hide(Constants.PopupUI.GameDamageCalculatePopup);
        }
        if(PopupManager.instance.isDialogVisible(Constants.PopupUI.GameRougeBuffPopup)){
            PopupManager.instance.hide(Constants.PopupUI.GameRougeBuffPopup);
        }
        EventListener.emit(GameEvent.CLOSE_GAMEPOPUP_BUBOO);
    }

    showLoadPopup(sceneName: string){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameLoadPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[sceneName]);
    }

    /* 显示引导界面 */
    showGuidePopup(step: number) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameGuidePopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[step]);
    }

    showChapterChatPopup(chapterId:number){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameChapterChatPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[chapterId]);
    }

    showToast(msg: string, posY: number = 0) {
        let path = Constants.toastPath;
        ResourcesUtil.getPrefab(path).then((item: Prefab) => {
            let toast = instantiate(item);
            toast.parent = this.ToastLayer;
            toast.setPosition(0, posY);
            toast.getComponent(Toast).init(msg);
        })
    }

    showBoardStartPointPopup(callBack:Function){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardStartPointPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[callBack]);
    }

    showBoardHealingPopup(num: number) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardHealingPopup;
        options.parent = this.BottomLayer;
        PopupManager.instance.show(options,[num]);
    }

    showBoardArmWrestlingPopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardArmWrestlingPopup;
        options.parent = this.BottomLayer;
        PopupManager.instance.show(options);
    }

    showBoardTreasurePopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardTreasurePopup;
        options.parent = this.BottomLayer;
        PopupManager.instance.show(options);
    }

    showBoardForgePopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardForgePopup;
        options.parent = this.BottomLayer;
        PopupManager.instance.show(options);
    }

    showBoardCardPopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardCardPopup;
        options.parent = this.BottomLayer;
        PopupManager.instance.show(options);
    }

    showBoardDicePopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardDicePopup;
        options.parent = this.BottomLayer;
        PopupManager.instance.show(options);
    }

    showBoardSmelterPopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardSmelterPopup;
        options.parent = this.BottomLayer;
        PopupManager.instance.show(options);
    }

    showBoardJailPopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardJailPopup;
        options.parent = this.BottomLayer;
        PopupManager.instance.show(options);
    }

    showBoardRaceResultPopup() {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardRaceResultPopup;
        options.parent = this.BottomLayer;
        PopupManager.instance.show(options);
    }

    showBoardShopPopup(isEvil: boolean) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardShopPopup;
        options.parent = this.BottomLayer;
        PopupManager.instance.show(options,[isEvil]);
    }

    showBoardBlessPopup(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardBlessPopup;
        options.parent = this.BottomLayer;
        PopupManager.instance.show(options);
    }

    showBoardAwardPopup(type: number,typeId: number,count: number) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardAwardPopup;
        options.parent = this.BottomLayer;
        PopupManager.instance.show(options,[type,typeId,count]);
    }

    showBoardEventInfoTip(boardBase: BoardItemBase){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardEventInfoTip;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[boardBase]);
    }

    showBoardPasswordPopup(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardPasswordPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    showBoardDiceRevivePopup(num: number,rate: number,cbk: Function){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardDiceRevivePopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[num,rate,cbk]);
    }

    showBoardAnyDicePopup(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardAnyDicePopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    showBoardStandByPopup(levelId: number){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardStandByPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[levelId]);
    }

    showBoardHouseProcessPopup(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardHouseProcessPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    showBoardHouseTaskAwardPopup(type: number,typeId: number,count: number) {
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardHouseTaskAwardPopup;
        options.parent = this.BottomLayer;
        PopupManager.instance.show(options,[type,typeId,count]);
    }

    showBoardChestEventPopup(isShowTitle: boolean = true){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardChestEventPopup;
        options.parent = this.BottomLayer;
        PopupManager.instance.show(options,[isShowTitle]);
    }

    showBoardBattleEventPopup(num:number,isBoss: boolean = false){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.BoardBattleEventPopup;
        options.parent = this.BottomLayer;
        PopupManager.instance.show(options,[num,isBoss]);
    }

    showGridBattlePopup(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameGridBattlePopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    showExhibitionPopup(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameExhibitionPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    showVotePopup(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameVotePopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    showNewLootPopup(id: number){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GameNewLootPopup;
        options.parent = this.TopLayer;
        PopupManager.instance.show(options,[id]);
    }

    showGMPopup(){
        let options = new PopupOptions();
        options.path = Constants.PopupUI.GMPopup
        options.parent = this.TopLayer;
        PopupManager.instance.show(options);
    }

    clearBottomLayer(){
        this.BottomLayer?.removeAllChildren();
    }

    public static _instance: OpenPopupManager = null;
    public static get instance(): OpenPopupManager {
        if (!this._instance) {
            this._instance = new OpenPopupManager();
        }
        return this._instance;
    }
}


