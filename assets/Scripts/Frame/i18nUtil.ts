import { _decorator, Component, Node } from 'cc';
import * as i18n from '../../../extensions/i18n/assets/LanguageData';
import { GameDefine } from '../GameDefine';
import { Util } from './Util';
const { ccclass, property } = _decorator;

@ccclass('i18nUtil')
export class i18nUtil extends Component {
    public static updateLangueage(){
        i18n.init(GameDefine.language);
        i18n.updateSceneRenderers();
    }

    public static getString(key:string):string{
        return i18n.t(key);
    }

    public static formatString(key: string, ...args: any[]){
        return Util.formatString(this.getString(key),...args);
    }
}


