
export class GameEvent {

    public static SAVE_GAME_DATA = 'saveGameData';//保存游戏数据
    public static SCREEN_VIBRATOR = 'screenVibrator';//屏幕震动

    public static GAME_TOUCH_START = 'gameTouchStart';
    public static GAME_TOUCH_MOVE = 'gameTouchMove';
    public static GAME_TOUCH_END = 'gameTouchEnd';
    public static GAME_TOUCH_CANCLE = 'gameTouchCancle';

    public static GAME_TAP_BTN = 'gameTapBtn';

    public static GAME_WIN_FAIL = 'gameWinFail';//游戏胜利结束
    public static GAME_OVER = 'gameOver';//游戏结束

    public static GAME_BATTLE = 'gameBattle';//游戏战斗

    public static SET_BATTLE_BTN_STATUS = 'setBattleBtnStatus';//设置战斗按钮状态
    public static CREATE_SKILL_EFFECT = 'createSkillEffect';//技能效果
    public static CREATE_MONSTER_SKILL_EFFECT = 'createMonsterSkillEffect';//创建怪物技能效果

    public static INIT_BUILD_GRID_LIST = 'initBuildGridList';//初始化重组格子列表
    public static INIT_BUILD_ITEM_POS = 'initBuildItemPos';//初始化重组武器位置
    public static ITEM_MOVE = 'itemMove';//武器移动
    public static ITEM_ICON_STATUS_INIT = 'itemIconStatusInit';//武器图标状态初始化
    public static ITEM_ICON_STATUS = 'itemIconStatus';//武器图标状态
    public static ITem_HALOICON_STATUS = 'item_haloicon_status';
    public static ITEM_UPGRADE = 'itemGrade';//武器升级
    public static ITEM_SHAKE = 'itemShake';//武器抖动
    public static ITEM_PlACE = 'itemPlace';//武器放置完成
    public static ITEM_REMOVE = 'itemRemove';//武器卸下
    public static ITEM_RESET = 'itemReset';//武器重新设置位置
    public static ITEM_PROGRESS_BAR = 'itemProgressBar';//武器进度条
    public static ITEM_CHECK_UPGRADE_STATUS = 'itemCheckUpgradeStatus';//武器检测升级情况
    public static ITEM_SILVER_COIN_UPDATE = 'item_silver_coin_update';//财宝箱增加银币动画
    public static ADD_REMOVE_ITEM_LIST = 'addRemoveItemList';//添加卸下武器列表
    public static ADD_PRE_ITEM_LIST = 'addPreItemList';//添加到临时武器列表
    public static ADD_TWO_BLOCK = 'addTwoBlock';//添加两格道具
    public static ITEM_REMOVE_REFRESH = 'itemRemoveRefresh';//武器卸下刷新
    public static ADD_ITEM_TO_ITEM_LIST = 'addItemToItemList';//添加临时武器列表
    public static HERO_HURT = 'heroHurt';//英雄受伤

    public static INIT_HERO_SKILL = 'initHeroSkill';//初始化英雄技能
    public static RECACULATE_HERO_EXTRAHP = 'recaculate_hero_extraHp';//
    public static UPDATE_SKILL_CD = 'updateSkillCD';

    public static INSERT_HERO_CIRCLE_OBJ = 'insertHeroCircleObj';//添加英雄对象
    public static INSERT_SKILL_RELEASE_CIRCLE_OBJ = 'insertSkillReleaseCircleObj';//添加技能释放范围对象
    public static INSERT_QUARD_TREE_RECT_CIRCLE = 'insertQuardTreeRectCircle';//添加四叉树检测对象
    public static DELETE_QUARD_TREE_OBJ = 'deleteQuardTreeObj';//删除四叉树对象
    public static CHECK_QUARD_TREE_OBJ = 'checkQuardTreeObj';//检测四叉树对象
    public static REFRESH_BOSS_HP = 'refreshBossHp';//刷新boss血量值
    public static CREATE_DAMAGER_NUM = 'createDamageNum';
    //public static SHOW_MONSTER_DIE_EFFECT = 'showMonsterDieEffect';//显示怪物死亡特效
    public static MONSTER_DIE_CHANGECOIN = 'monsterDieChangeCoin';
    public static MONSTER_DIE_CHANGEEXP = 'monsterDieChangeExp';//经验掉落动画
    public static MONSTER_DIE_CHANGESILVER = 'monsterChangeSilver';//

    public static SHOW_HERO_HP = 'showHeroHp';//显示英雄血条
    public static SHOW_MONSTER_HP = 'showMonsterHp';//显示怪物血条
    public static SHOW_MONSTER_SHADOW = 'showMonsterShadow';//显示怪物阴影
    public static SHOW_SKILL_BATTLEEFFECT = 'showSkillBoomEffect';//显示技能爆炸特效
    public static HERO_ANIM = 'heroAnim';//英雄动画
    public static SHOW_STERNWAVE = 'showSternWave';
    public static HIDE_STERNWAVE = 'hideSternWave';
    public static SHOW_RIPPLE = 'showRipple';
    public static HIDE_RIPPLE = 'hideRipple';
    public static CREATE_DAMAGEAREA_ITEM = 'createDamageAreaItem';
    public static CREATE_CAPTAINSKILL_SHAKEWAVE = 'createCaptainSkill_ShakeWave';
    public static CREATE_CAPTAINSKILL_SHOOT = 'createCaptainSkill_Shoot';
    public static CREATE_AIRSHIP = 'createAirship';
    public static CLEAR_AIRSHIP = 'clearAirship';
    public static AIRSHIP_ATTACK = 'airship_attack';

    public static RESTARTBATTLE_CURRENTWAVE = 'restartBattle_currentWave';
    public static ADD_SILVER_COIN = 'addSilverCoin';//获得银币
    public static SILVER_COIN_UPDATE = 'silver_coin_update';//更新银币
    public static UPDATE_AD_COUPON = 'update_ad_coupon';//更新局内广告券
    public static RESERT_SELECT_BAG = 'resertSelectBag';//重新调整背包
    public static UPDATE_MONSTER_PROGRESS = 'updateMonsterProgress';//更新怪物进度
    public static SHOW_HIDE_SKILL_LIST = 'showHideSkillList';
    public static SHOW_HIDE_PLACE_LIST = 'showHidePlaceList';
    public static SHOW_ALARM = 'showAlarm';//展示怪群/BOSS提示


    public static PLACE_GRID_START = 'placeGridStart';//放置格子开始
    public static PLACE_GRID_MOVE = 'placeGridMove';//放置格子移动
    public static PLACE_GRID_END = 'placeGridEnd';//放置格子结束
    public static CLEAR_AREA_DATA = 'clearAreaData';//清除区域数据
    public static PLACE_GRID_FINISH = 'placeGridFinish';//放置完成

    public static REFRESH_COIN = "refresh_coin";//刷新金币
    public static REFRESH_DOLLAR = "refresh_dollar";//刷新钻石

    public static SELECT_SEVENDAYS_ITEM = "selectSevenDaysItem";//选中七日福利的道具
    public static UPDATE_SEVENDAYS_RED = "updateSevenDaysRed";

    public static UPDATE_BAG = 'update_bag';//更新背包
    public static SHOW_ITEM_FLY = 'show_item_fly';//展示道具飞入动画
    public static UPDATE_MAIN_GACHA_RED = 'update_main_gacha_red';//更新主界面开启宝箱红点
    public static UPDATE_MAIN_AWARD_TIP = 'update_main_award_tip';//更新主界面奖励宝箱预览状态
    public static UPDATE_MAIN_BOTTOM = 'update_main_bottom';

    public static SHOW_BUFFDEESC_BUBBLE = 'showBBuffDescBubble';

    public static AWARDCELL_SHOWDESC= 'award_cell_show_desc';//更新主界面开启宝箱红点

    public static DAILY_TASK = 'daily_task';//每日任务事件发生
    public static NEXT_CHAPTER = 'next_chapter';//下一章节
    public static UPDATE_BOUNTY = 'update_Bounty';//更新悬赏
    public static LOOK_AD = 'look_ad';//看广告
    public static CLOSE_GAMEPOPUP_BUBOO = 'closegamepopbuboo';
    public static SELECT_PROFILE_ITEM = 'select_profile_item';//选中头像道具
    public static UPDATE_PROFILE = 'update_profile';//更新玩家头像
    public static UPDATE_PROFILE_RED = 'update_profile_red';//更新玩家头像红点信息

    public static CLOSE_CHOOSEBUFF = 'close_chooseBuff';
    public static GUIDE_HAND_MOVE = 'guide_hand_move';
    public static GUIDE_HIDE_VIEW = 'guide_hide_view';
    public static GUIDE_CLICK_ENABLE = 'guide_click_enable';

    //以下是rollhero项目新增的事件

    public static MOVE_ROLE = 'move_role';//扔骰子后角色移动
    public static UPDATE_GAMEPOINT = 'update_gamepoint';//更新游戏内资源信息
    public static UPDATE_STAGE_INFO = 'update_stage_info';//更新层数信息
    public static UPDATE_MEDICINE_INFO = 'update_medicine_info';//更新治疗药剂信息
    public static UPDATE_BOSS_TRUN = 'update_boss_trun';//更新boss回合信息
    public static UPDATE_BOSS_BATTLE = 'update_boss_battle';//更新boss战斗
    public static UPDATE_ITEM_COST_COLOR = 'update_item_cost_color';//更新商店道具信息
    public static BUY_ITEM_FINISH = 'buy_item_finish';//商店购买道具完成
    public static SHOW_GAMEPOINT_FLY = 'show_gamepoint_fly';//展示资源点飞入动画
    public static SHOW_STAGE_ITEM_FLY = 'show_stage_item_fly';//展示层级节点飞入动画
    public static SHOW_EVENT_TITLE = 'show_event_title';//展示事件标题
    public static SHOW_ROLL_BUTTON = 'show_roll_button';//是否显示roll按钮
    public static SHOW_EQUIP_HP_STAGE = 'show_equip_hp_stage';//是否显示装备栏、血条和层数信息
    public static SHOW_AD_ITEM = 'show_ad_item';//是否显示格外道具使用栏
    public static SHOW_GOLD_DICE_ITEM = 'show_gold_dice_item';//是否显示任意骰子使用栏
    public static SHOW_HAMMER_ACTION = 'show_hammer_action';//展示锤击动画
    public static SHOW_HEAL_EFFECT = 'show_heal_effect';//展示治疗动画
    public static SHOW_HOUSE_TITLE = 'show_house_title';//展示方尖碑BUFF信息
    public static EVENT_FINISH = 'event_finish';//完成事件
    public static UPDATE_EVENT_TIP = 'update_event_tip';//刷新角落事件状态
    public static CREATE_EVENT_TIP = 'create_event_tip';//创建角落事件栏位
    public static CREATE_NEW_EVENT = 'show_new_event';//展示生成新的事件格子
    public static CREATE_ONE_EVENT = 'show_one_event';//创建一个指定格子
    public static CREATE_EQUIPMENT = 'create_equipment';
    public static CREATE_ONE_EQUIPMENT = 'create_one_equipment';
    public static CREATE_ITEM_ONEQUIPMENTLAYER = 'create_item_onequipmentlayer';
    public static CLEAR_EQUIPMENT_UNEQUIPED = 'clear_equipment_unequiped';
    public static UPDATE_EQUIPMENT_DATA = 'update_equipment_data';
    public static INIT_SAVE_EQUIPMENT = 'init_save_equipment';
    public static DO_NEXT_BOARD_ACTION = 'do_next_board_action';//执行下一个事件
    public static HIDE_DICE = 'hide_dice';//隐藏骰子点数显示
    public static SHOW_BLESS_EFFECT = 'show_bless_effect';//左下角展示祝福名称
    public static SHOW_DICE_ACTION = 'show_dice_action';//展示骰子动画
    public static CREATE_HOUSE_MISSION_TIP = 'create_house_mission_tip';//创建或者刷新方尖碑建成信息栏

    public static UPDATE_HERONATURE_LEVEL = 'update_hero_nature_level';
    public static RESET_HERONATRURE_PROGRESSBAR = 'reset_hero_nature_progress_bar';
    public static GAME_BATTLE_START = 'gameBattleStart';//战斗开始
    public static GAME_BATTLE_END = 'gameBattleEnd';//战斗结束
    public static BATTLE_UPDATE_HERO_EQUIPMENT = 'battle_update_hero_equipment';//更新英雄装备，可带参数【Equipment】
    public static SELECT_FRIENDCELL = 'select_friendcell';
    public static CLOSE_FRIENDSELECTPOP = 'close_friend_selectpop';
    public static UPDATE_FRIEND = 'update_friend';
    public static EXCHANGE_FRIEND = 'exchange_friend';
    public static UPDATE_VITALITY_INFO = 'update_vitality_info';//更新体力信息
    public static UPDATE_HERO_HP = 'updateHeroHp';//更新英雄血量
    public static UPDATE_HERO_SHIELD = 'updateHeroShield';//
    public static GUIDE_TOUCH_START = 'guideTouchStart';
    public static GUIDE_TOUCH_MOVE = 'guideTouchMove';
    public static GUIDE_TOUCH_END = 'guideTouchEnd';
    public static GUIDE_TOUCH_CANEL = 'guideTouchCanel';

    public static UPDATE_LIBAO_SROLLVIEW = 'updateLibaoSrollview';//更新礼包界面的滚动视图
    public static UPDATE_LIBAO_CELL = 'updateLibaoCell';//更新礼包界面的滚动视图

    public static UPDATE_ONLINE_BTN = 'update_online_btn';
    public static UPDATE_LI_BAO_BTN = 'update_li_bao_btn';//更新礼包按钮状态
    public static UPDATE_NEW_FRIEND_LI_BAO_BTN = 'update_new_friend_li_bao_btn';//更新新好友礼包按钮状态
    public static UPDATE_FIRST_MAIL_BTN = 'update_first_mail_btn';//更新邮件按钮状态
    public static UPDATEENTERAWARDRED = 'updateEnterAwardRed';//更新入口奖励红点
    public static UPDATE_FRIENDDICE_AWARD_TIP = 'update_frienddice_award_tip';
    public static YIZHIER_MEDICINE_INFO = 'yizhier_medicine_info';//偷疗药剂信息

    public static GRID_ITEM_CLEAR = 'gridItemClear';//移除格子
    public static GRID_BATTLE_NEXTMAP = 'gridBattleNextMap';//下一张消除地图
    public static GRID_ITEM_CLEAR_EVENT = 'gridItemClearEvent';//增加属性事件
    public static GRID_UPDATE_HERO_ATTR = 'gridUpdateHeroAttr';//刷新你的属性
    public static GRID_BATTLE_LOSE = 'gridBattleLose';//推箱子挂掉了
    public static GRID_BATTLE_ADDSCORE = 'gridBattleAddScore';//推箱子加积分
    public static VOTE_UPDATE_RED = 'voteUpdateRed';//刷新投票红点
    public static FLY_LOOT_BTN = 'flyLootBtn';//飞向按钮处
    public static LOOT_UPDATE_RED = 'lootUpdateRed';
}


