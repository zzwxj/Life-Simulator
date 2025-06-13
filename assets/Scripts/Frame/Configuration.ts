import { sys } from "cc";
import { Constants } from "../Constants";
import { Util } from "./Util";

export class Configuration {
    private _jsonData = {};
    private _markSave = false;

    static _instance: Configuration = null!;

    public static get instance() {
        if (!this._instance) {
            this._instance = new Configuration();
        }

        return this._instance
    }

    /* 初始化 */
    public init() {
        let localdata = sys.localStorage.getItem(Constants.gameConfigId);
        if (localdata && localdata.startsWith('@')) {
            localdata = localdata.substring(1);
            localdata = Util.decrypt(localdata);
            this._jsonData = JSON.parse(localdata);
        }
        setInterval(this.scheduleData.bind(this), 500);
    }

    /* 根据版本号清除本地数据 */
    public clearConfigDataToVersion() {
        let loacalCacheVersionConfig = this.getConfigData(Constants.cacheVersion);
        if (loacalCacheVersionConfig) {
            let loacalCacheVersionConfigArr = JSON.parse(loacalCacheVersionConfig);
            //比较本地版本号
            let copyVerson = Util.clone(Constants.cacheVersionConfig);
            Constants.cacheVersionConfig.forEach((item: any, index: number) => {
                loacalCacheVersionConfigArr.forEach((ele: any, ind: number) => {
                    if (item.versionName == ele.versionName && item.version > ele.version && ele.versionName == 'gameData') {
                        //清除游戏数据
                        this.clearConfigData();
                        this._jsonData = {};
                    }
                    else {
                        if (item.versionName == ele.versionName && item.version > ele.version) {
                            if (this._jsonData.hasOwnProperty(item.versionName)) {
                                delete this._jsonData[item.versionName];
                            }
                        }

                        copyVerson.some((el, index) => {
                            if (el.versionName == ele.versionName) {
                                copyVerson.splice(index, 1);
                                return true;
                            }
                        });
                    }
                });
            });

            //获取新增记录
            copyVerson.forEach((item: any) => {
                if (this._jsonData.hasOwnProperty(item.versionName)) {
                    delete this._jsonData[item.versionName];
                }
            });

        }
        else {
            //根据版本号清除数据
            Constants.cacheVersionConfig.forEach((item: any) => {
                if (this._jsonData.hasOwnProperty(item.versionName)) {
                    delete this._jsonData[item.versionName];
                }
            })
        }
        //更新本地版本数据
        this.setConfigData(Constants.cacheVersion, JSON.stringify(Constants.cacheVersionConfig));

    }

    /* 清除指定数据 */
    public clearByKey(key: string) {
        if (this._jsonData.hasOwnProperty(key)) {
            delete this._jsonData[key];
            this._markSave = true;
        }
    }

    /* 清除存储数据 */
    public clearConfigData() {
        sys.localStorage.clear();
    }

    /* 获取存储数据 */
    public getConfigData(key: string) {
        const data: string = this._jsonData[key];
        return data || null;
    }

    public getNumberConfigData(key: string, _default: number = 0) {
        const data: number = this._jsonData[key];
        return data || _default;
    }

    public getArrayConfigData(key: string) {
        const data: number[] = this._jsonData[key];
        return data || [];
    }

    public getStringArrayConfigData(key: string) {
        const data: string[] = this._jsonData[key];
        return data || [];
    }

    public getListConfigData<T>(key: string, cls?: any): T[] {
        let obj = this._jsonData[key];
        if (obj == null) {
            return null;
        }

        let list: T[] = [];
        for (let i = 0; i < obj.length; i++) {
            list.push(new cls(obj[i]));
        }

        return list;
    }

    public getMapConfigData<T>(key: string, csl?: any): Map<string, T> {
        let obj = this._jsonData[key];
        if (obj == null) {
            return null;
        }


        //先这个写，后面看看泛型怎么定义
        let data: Map<string, T> = new Map();
        for (let k of Object.keys(obj)) {
            let v: T;
            if (csl == null) {
                v = obj[k];
            } else {
                v = new csl(obj[k]);
            }
            data.set(k, v);
        }
        return data;
    }

    /* 设置存储数据 */
    public setConfigData(key: string, value: string) {
        this._jsonData[key] = value;
        this._markSave = true;
    }

    public setNumberConfigData(key: string, value: number) {
        this._jsonData[key] = value;
        this._markSave = true;
    }

    public setArrayConfigData(key: string, value: number[]) {
        this._jsonData[key] = value;
        this._markSave = true;
    }

    public setStringArrayConfigData(key: string, value: string[]) {
        this._jsonData[key] = value;
        this._markSave = true;
    }

    public setListConfigData<T>(key: string, data: T[]) {
        this._jsonData[key] = data;
        this._markSave = true;
    }

    public setMapConfigData<T>(key: string, data: Map<string, T>) {
        let obj = Object.create(null);
        data.forEach((value, key) => {
            obj[key] = value;
        });

        this._jsonData[key] = obj;
        this._markSave = true;
    }

    /* 数据存储 */
    public scheduleData() {
        if (!this._markSave) {
            return;
        }
        const data = JSON.stringify(this._jsonData);
        sys.localStorage.setItem(Constants.gameConfigId, '@' + Util.encrypt(data));
        this._markSave = false;
    }

}

export enum ConfigDataName {
    //用户隐私条款是否同意
    UserAgreement = "UserAgreement",

    //UserId
    UserId = "UserId",

    //Cdkey
    RecordCdkeyUse = "RecordCdkeyUse",
    //金币
    Coin = "Coin",
    //钻石
    Dollar = "Dollar",
    //创角时间
    CreateRoleTime = "CreateRoleTime",
    //上次一登录时间
    LastLoginTime = "LastLoginTime",
    //在线奖励
    //OnlineReward = "OnlineReward",
    //礼包数据
    LiBaoData = "LiBaoData",

    //CdKey
    CdKey = "CdKey",
    //specialCdKey
    SpecialCdKey = "SpecialCdKey",
    //累计奖励
    MilesReward = "MilesReward",
    //航程豪礼
    StageReward = "StageReward",
    //体力数据
    Vitality = "Vitality",
    //每日任务数据
    DailyTask = "DailyTask",
    //天赋数据
    Talent = "Talent",
    //船长数据
    Captain = "Captain",
    //挂机数据
    Hang = "Hang",
    //功能开启数据
    Function = "Function",
    //七日数据
    SevenDay = "SevenDay",
    //关卡宝箱领取集合
    StageAwardList = "StageAwardList",
    //每日钻石购买次数
    AdDayDollarTimes = "AdDayDollarTimes",
    //上一次免费钻石领取时间
    FreeDollarTimestamp = "FreeDollarTimestamp",
    MarketData = "MarketData",
    //开启宝箱功能的三种类型宝箱免费开启时的时间戳
    GachaFreeTimestampList = "GachaFreeTimestampList",
    //震动是否关
    GameVibrate = "GameVibrate",
    //背包数据
    Bag = "Bag",
    //消耗数据
    Consume = "Consume",
    //战备
    ReadinessList = "ReadinessList",
    //玩家数据
    Player = "Player",
    //玩家悬赏数据
    BountyData = "BountyData",
    //上一次展示悬赏弹窗的时间戳
    BountyShowTimeTimestamp = "BountyShowTimeTimestamp",
    //存档排行档数据 用于计算每个用户的分数
    RankListData = "RankListData",
    //存档排行档数据
    RankListData2 = "RankListData2",
    //排行榜2记录的时间戳
    RankListData2Timestamp = "RankListData2Timestamp",
    //头像数据
    ProfileData = "ProfileData",
    //玩家头像ID
    PlayerProfileId = "PlayerProfileId",
    //冒险数据
    AdventureData = "AdventureData",
    //游戏局内记录
    GameSaveData = "GameSaveData",
    //上一次体力恢复的时间
    LAST_VITALITY_RECOVERY_TIME = "last_vitality_recovery_time",
    //引导步骤
    GuideStep = "GuideStep",
    //开放加速
    AdSpeedUp = "AdSpeedUp",
    //#region 以下是heroiii新增 
    //四属性等级
    NatureLevelList = "NatureLevelList",
    //挖宝玩法记录
    BoardTreasureData = "BoardTreasureData",
    //我所去过最高的地方
    MaxChapterFloorId = "MaxChapterFloorId",
    //单局存档
    BoardSaveData = "BoardSaveData",
    //伙伴
    FriendList = "FriendList",
    //伙伴碎片
    FriendPieces = "FriendPieces",
    FriendDiceData = "FriendDiceData",
    //抽卡等级
    GachaExp = "GachaExp",
    //记录累计通过的楼层(抽卡用)
    GachaFreeCount = "GachaFreeCount",
    //第一封邮件 领完作废
    FirstMail = "FirstMail",

    //记录所有推送过的礼包的id 下次就不会再推送了
    PushLibaoIdList = "PushLibaoIdList",
    //引导步骤
    ChapterChatGuide = "ChapterChatGuide",

    //入口奖励刷新时间戳
    EnterAwardTimestamp = "EnterAwardTimestamp",
    //入口奖励是否以及领取
    EnterAwardIsGet = "EnterAwardIsGet",
    //添加桌面奖励是否已经领取
    AddShortcutAwardIsGet = "AddShortcutAwardIsGet",
    //在线奖励
    OnlineReward = "OnlineReward",

    //体力领取12点档位时间戳
    TiliAward12Timestamp = "TiliAward12Timestamp",
    //体力领取18点档位时间戳
    TiliAward18Timestamp = "TiliAward18Timestamp",

    //推方块玩法进入时间戳
    CubeGameTimestamp = "CubeGameTimestamp",

    //开启GM工具入口
    GMToolIsOpen = "GMToolIsOpen",

    //是否免广
    FreeAd = "FreeAd",

    //音乐音量
    MusicVolume = "MusicVolume",
    //音效音量
    SoundVolume = "SoundVolume",
    //推方块记录积分
    CubeScore = "CubeScore",
    //投票数据
    VoteData = "VoteData",
    //展览品
    ExhibitionPicks = "ExhibitionPicks",
    //当前正在使用的装扮ID
    CurDressId = "CurDressId",
    //当前正在使用的骰子ID
    CurDiceId = "CurDiceId",
    //是否建造过纪念碑
    MonumentBuild = "MonumentBuild",
}

export enum adName {
    Shop_AddCoin = "商店增加金币",
    Shop_AddDollar = "商店增加钻石",
    Shop_AddFriend = "商店增加伙伴",

    Shop_Refresh = "商店刷新",
    Main_AddSta = "主界面增加体力",
    Main_Gacha_Double = "主界面抽卡翻倍",
    Main_LiBao = "领取礼包_",
    Main_OnlineReward = "领取在线奖励",
    Main_StandByItem = "获取游戏开始前准备道具",
    Game_Reborn = "游戏复活",
    Game_Double = "游戏二倍速",
    Game_Buff = "游戏祝福刷新",
    Game_Shop_Soul = "游戏商店购买魂石",
    Game_Shop_BuyHp = "游戏商店购买生命药水",
    Game_GoodEvent = "游戏两个好事件格子",
    Game_Equip_Rebuild = "游戏装备重铸",
    Game_GoldDice = "游戏任意骰子",
    Game_Forge = "铁匠铺广告提高成功率",

    //宝藏地图刷新
    Game_TreasureMap_Refresh = "游戏宝藏地图刷新",

    Game_Win_DoubleReward = "游戏胜利双倍奖励",
    SevenDay_AgainReward = "七日奖励",
    Game_NvshenDate_BuyChoco = "女神约会买巧克力",
    Game_Cube = "推方块",
    Vote_NewHero = "投票_新英雄",
    Vote_NewFriend = "投票_新伙伴",
    Vote_NewSystem = "投票_新玩法",
}
