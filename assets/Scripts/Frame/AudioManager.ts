import { _decorator, Node, AudioClip, AudioSource, game, director, assetManager, Button, Toggle } from "cc";
import { ResourcesUtil } from "./ResourcesUtil";
import { CfgMgr } from "./CfgMgr";
import { Debug } from "./Debug";
import { SoundCfg } from "../Model/SoundModel";
import { ConfigDataName, Configuration } from "./Configuration";
import { Constants } from "../Constants";
import { AudioId } from "./AudioId";

export class AudioManager {
    public mainVolume: number = 1;      // 主音量

    public static get instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new AudioManager();
        return this._instance;
    }

    public get musicSource(): AudioSource {
        return this._musicSource;
    }

    public get musicVolume(): number {
        return this._musicVolume * this._musicSwitch;;
    }

    public set musicVolume(v: number) {
        this._musicVolume = v;
        this._setCurMusicVolume();
    }

    public get soundVolume(): number {
        return this._soundVolume * this._soundSwitch;
    }

    public set soundVolume(v: number) {
        this._soundVolume = v;
        this._setCurSoundVolume();
    }

    private _musicVolume: number = 1;//背景音乐音量
    private _soundVolume: number = 1;//音效音量
    private _musicSwitch: number = 1;//音乐开关
    private _soundSwitch: number = 1;//音效开关
    private _mapSound: Map<string, Array<AudioSource>> = new Map;//所有的音效
    private _mapMusic: Map<string, AudioSource> = new Map;//所有的音乐
    private _persistRootNode: Node = null!;
    private _musicSource: AudioSource = null!;
    private _curSounds: Array<AudioSource> = [];

    private static _instance: AudioManager;

    /**
     * 初始化
     * @returns 
     */
    public init() {
        if (this._persistRootNode) return; //避免切换场景初始化报错
        this._persistRootNode = new Node('audio');
        director.getScene()!.addChild(this._persistRootNode);
        director.addPersistRootNode(this._persistRootNode);
        this.SetButtonSound();
        this._musicSwitch = this.getAudioSetting(true) ? 1 : 0;
        this._soundSwitch = this.getAudioSetting(false) ? 1 : 0;


        this.setMusic(this.getMusicVolume(true));
        this.setSound(this.getMusicVolume(false));
    }


    /* 播放通用按钮声音 */
    public SetButtonSound(): void {
        if (Button.prototype["touchBeganClone"]) return;

        Button.prototype["touchBeganClone"] = Button.prototype["_onTouchEnded"];

        Button.prototype["_onTouchEnded"] = function (event) {

            if (this.interactable && this.enabledInHierarchy) {
                if (this.node.getComponent(AudioId) && this.node.getComponent(AudioId).audioId != 0) {

                } else {
                    // 播放自己的按钮音效
                    // AudioManager.instance.playSound(Constants.audioSource.CommonClick);
                    if (this instanceof Toggle) {
                        // 播放自己的按钮音效
                        AudioManager.instance.playSound(101);

                    }
                    else {
                        // 播放自己的按钮音效
                        AudioManager.instance.playSound(101);
                    }
                }
            }

            this.touchBeganClone(event);

        }
    }


    /**
     * 设置当前音乐音量
     */
    private _setCurMusicVolume() {
        //@ts-ignore
        for (const value of this._mapMusic.values()) {
            value.volume = this.musicVolume;
        }
    }

    /**
     * 设置当前音效音量
     */
    private _setCurSoundVolume() {
        //@ts-ignore
        for (const value of this._mapSound.values()) {
            value.forEach((source: AudioSource) => {
                source.volume = this.soundVolume;
            })
        }
    }

    /**
       * 获取音频设置
       * @param isMusic 
       * @returns 
       */
    public getAudioSetting(isMusic: boolean) {
        let state;
        if (isMusic) {
            state = Configuration.instance.getConfigData('music');
        } else {
            state = Configuration.instance.getConfigData('sound');
        }
        return !state || state === 'true' ? true : false;
    }


    public getMusicVolume(isMusic: boolean): number {
        let volume = Configuration.instance.getConfigData(isMusic ? ConfigDataName.MusicVolume : ConfigDataName.SoundVolume)
        if (!volume)
            return 1;

        let v = parseFloat(volume);
        if (v > 1)
            return 1;
        return v;
    }
    /**
    * 获取音效
    * @param clip 
    * @returns 
    */
    private _getAudioSource(clip: AudioClip) {
        let result: AudioSource | undefined;

        this._mapSound.forEach((sounds, name) => {
            if (clip.name == name) {
                if (sounds.length > 0) {
                    const source = sounds.pop();
                    result = source;
                    this._mapSound.set(name, sounds);
                }
                return;
            }
        })

        if (!result) {
            result = this._persistRootNode.addComponent(AudioSource);
        }

        result.clip = clip;
        result.currentTime = 0;
        return result;
    }

    /**
    * 播放音乐
    * @param {number} Id id 音乐名称可通过 配置id获取
    * @param {Boolean} loop 是否循环播放
    * @param {Function} cb 播放开始时回调
    */
    public async playMusic(id: number, loop: boolean, cb?: Function) {
        let audioCfg = this._geAudioNameById(id);
        if (!audioCfg) {
            return;
        }
        let name = audioCfg.resource;
        let path = Constants.AUDIO_FILE_PATH.MUSIC + name;
        let source = this._musicSource;
        source && source.stop();

        if (source && source.clip!.name == name) {
        } else if (this._mapMusic.get(name)) {
            //先把之前的那个背景音乐存起来
            if (source && !this._mapMusic.get(source.clip!.name)) {
                this._mapMusic.set(source.clip!.name, source)
            }
            //原来已经创建的就从里面取
            source = this._mapMusic.get(name)!;
        } else {
            //如果已经有这个组件了就不用再添加了
            let musicSource = this._getExistMusicSource(name);
            if (!musicSource) {
                let clip = await ResourcesUtil.loadResNew(path, AudioClip) as AudioClip;
                //防止网速慢情况下，同时调用多次playMusic,导致短时间多个await
                musicSource = this._getExistMusicSource(name);
                if (!musicSource) {
                    musicSource = this._persistRootNode.addComponent(AudioSource);
                    musicSource.clip = clip;
                    this._mapMusic.set(name, musicSource);
                }
            }

            source = musicSource;
        }

        source.currentTime = 0;
        source.volume = /*audioCfg.Volume * */this.musicVolume;
        source.loop = loop;
        source.playOnAwake = false;

        this._musicSource = source;
        if (this._musicSwitch) {
            source.play();
        }
        cb && cb();
    }

    /**
     * 获取audio节点下已经存在的同名称AudioSource组件
     *
     * @private
     * @param {string} name
     * @return {*} 
     * @memberof AudioManager
     */
    private _getExistMusicSource(name: string) {
        for (let i = this._persistRootNode.components.length - 1; i >= 0; i--) {
            let com = this._persistRootNode.components[i];
            if (com instanceof AudioSource && com.clip!.name == name) {
                console.log("###已经有这个音乐组件了", name);
                return com;
            }
        }

        return null;
    }

    /**
    * 获取音效配置
    */
    private _geAudioNameById(Id: number) {
        let soundCfg = CfgMgr.getDataById<SoundCfg>(new SoundCfg(), Id);
        return soundCfg;
    }

    /**
     * 播放音效
     * @param {number} id 音效名称可通过 配置id获取
     * @param {Boolean} loop 是否循环播放
     */
    public async playSound(id: number, loop: boolean = false, cb?: Function, isForce: boolean = false) {
        if (!id) {
            return;
        }
        if (!isForce && (this._curSounds.length + 2) >= AudioSource.maxAudioChannel) {
            return;
        }
        let audioCfg = this._geAudioNameById(id);
        if (!audioCfg) {
            return;
        }
        let name = audioCfg.resource;
        let path = Constants.AUDIO_FILE_PATH.SOUND + name;

        const clip = await ResourcesUtil.loadResNew(path, AudioClip) as AudioClip;
        let source = this._getAudioSource(clip);

        source.volume = /*audioCfg.Volume * */this.soundVolume;
        source.loop = loop;
        source.playOnAwake = false;
        source.name = id.toString();

        this._curSounds.push(source);
        if (this._soundSwitch) {
            //source.play();
            if (!loop) {
                source.playOneShot(source.clip);
                setTimeout(() => {
                    // if (this._curSounds.indexOf(source) >= 0) {
                    //     this._curSounds.splice(this._curSounds.indexOf(source), 1);
                    // }

                    // if (!this._mapSound.get(name)) {
                    //     this._mapSound.set(name, [source]);
                    // } else {
                    //     const sounds = this._mapSound.get(name)!;
                    //     sounds.push(source);
                    //     this._mapSound.set(name, sounds);
                    // }
                    if (this._curSounds.indexOf(source) >= 0) {
                        this._curSounds.splice(this._curSounds.indexOf(source), 1);
                    }
                    assetManager.releaseAsset(source.clip);
                    source.destroy();

                    cb?.();
                }, source.duration * 1000);
            } else {
                source.play();
            }
        }
    }

    public playUnstackaleSound(id: number, loop: boolean = false, cb?: Function, isForce: boolean = false) {
        if (!this.isSoundPlaying(id.toString())) {
            this.playSound(id, loop, cb, isForce);
        }
    }

    /**
     * 当前是否正在播放指定音效
     *
     * @param {string} name
     * @return {*} 
     * @memberof AudioManager
     */
    public isSoundPlaying(name: string) {
        return this._curSounds.some((source: AudioSource) => {
            return source.name == name;
        })
    }

    /**
     * 是否存在指定音乐
     *
     * @param {string} name
     * @return {*} 
     * @memberof AudioManager
     */
    public isMusicExist(name: string) {
        return this._mapMusic.get(name) != null;
    }

    /**
     * 指定背景音乐是否正在播放
     *
     * @param {string} name
     * @return {*} 
     * @memberof AudioManager
     */
    public isMusicPlaying(name: string) {
        return this._musicSource && this._musicSource.clip!.name == name && this._musicSource.playing;
    }

    /**
     * 预加载音乐
     * @param musics 
     */
    public async preLoadMusics(musics: Array<number>) {
        for (let i = 0; i < musics.length; i++) {
            const id = musics[i];
            let audioCfg = this._geAudioNameById(id);
            if (!audioCfg) {
                continue;
            }
            let name = audioCfg.resource;
            let path = Constants.AUDIO_FILE_PATH.MUSIC + name;
            const clip = await ResourcesUtil.loadResNew(path, AudioClip)
            if (clip) {
                const musicSource = this._persistRootNode.addComponent(AudioSource);
                musicSource.clip = clip as AudioClip;
                this._mapMusic.set(name, musicSource);
            }
        }
    }

    /**
     * 开关音乐
     * @param open 
     */
    public switchMusic(open: boolean) {
        if (open) {
            this.resumeMusic();
        } else {
            this.stopMusic();
        }
        Configuration.instance.setConfigData('music', `${open}`);
    }

    /**
     * 开关音效
     * @param open 
     */
    public switchSound(open: boolean) {
        if (open) {
            this.resumeSound();
        } else {
            this.pauseSound();
        }
        Configuration.instance.setConfigData('sound', `${open}`);
    }

    /**
     * 暂停所有音频播放
     */
    public stopAllAudio() {
        this.stopMusic();
        this.pauseSound();
    }

    /**
     * 暂停当前音乐
     */
    public stopMusic() {
        this._musicSwitch = 0;
        this._musicSource && this._musicSource.pause();
    }

    /**
     * 停止所有正在播放的背景音乐（一般只会有一个正在播放的背景音乐）
     *
     * @memberof AudioManager
     */
    public stopAllMusic() {
        //@ts-ignore
        for (const value of this._mapMusic.values()) {
            if (value && value.playing) {
                value.stop();
            }
        }
    }

    /**
     * 删除当前背景音乐
     */
    public destroyMusic() {
        if (this._musicSource.clip) {
            if (this._mapMusic.has(this._musicSource.clip.name)) {
                this._mapMusic.delete(this._musicSource.clip.name);
            }
            if (this._musicSource) {
                this._musicSource.destroy();
                this._musicSource = null!;
            }
        }
    }

    /**
     * 暂停音效
     */
    public pauseSound() {
        this._soundSwitch = 0;
        this._curSounds.forEach((source: AudioSource) => {
            if (source.playing) {
                source.pause();
            }
        })
    }

    /**
     * 停止播放当前所有正在播放的音效
     *
     * @memberof AudioManager
     */
    public stopAllSound() {
        //@ts-ignore
        for (const value of this._mapSound.values()) {
            if (value && value.length) {
                value.forEach((audio: AudioSource) => {
                    if (audio && audio.playing) {
                        audio.stop();
                    }
                })
            }
        }

        for (let idx = 0; idx < this._curSounds.length; idx++) {
            let audio = this._curSounds[idx];
            if (audio && audio.playing) {
                audio.stop();
            }
        }
    }

    /**
     * 停止播放当前在arr里面的所有音效
     *
     * @param {Array<string>} arr
     * @memberof AudioManager
     */
    public stopSoundArr(arr: Array<string>) {
        //@ts-ignore
        for (const value of this._mapSound.values()) {
            if (value && value.length) {
                value.forEach((audio: AudioSource) => {
                    if (audio && audio.playing && arr.indexOf(audio.clip!.name) != -1) {
                        audio.stop();
                    }
                })
            }
        }

        for (let idx = 0; idx < this._curSounds.length; idx++) {
            let audio = this._curSounds[idx];
            if (audio && audio.playing && arr.indexOf(audio.clip!.name) != -1) {
                audio.stop();
            }
        }
    }

    /**
     * 停止播放当前在arr里面的所有音乐（一般只会有一个正在播放的背景音乐）
     *
     * @param {Array<string>} arr
     * @memberof AudioManager
     */
    public stopMusicArr(arr: Array<string>) {
        //@ts-ignore
        for (let value of this._mapMusic.values()) {
            if (value && value.playing && arr.indexOf(value.clip!.name) != -1) {
                value.stop();
            }
        }
    }

    /**
      * 继续播放所有音效和音乐
      */
    public resumeAll() {
        this.resumeMusic();
        this.resumeSound();
    }

    /**
     * 恢复音乐
     */
    public resumeMusic() {
        this._musicSwitch = 1;
        if (this._musicSource) {
            this._musicSource.volume = this.musicVolume;
            this._musicSource.play();
        }
    }

    /**
     * 恢复音效
     */
    public resumeSound() {
        this._soundSwitch = 1;

        this._curSounds.forEach((source: AudioSource) => {
            if (source.state == AudioSource.AudioState.PAUSED) {
                source.volume = this.soundVolume;
                source.play();
            }
        })
    }

    /**
     * 移除不需要的音乐
     * @param musics 
     */
    public removeMusic(musics: Array<string>) {
        for (let i = 0; i < musics.length; i++) {
            const name = musics[i];
            const audioSource = this._mapMusic.get(name);
            this._mapMusic.delete(name);
            if (audioSource) {
                //@ts-ignore
                assetManager.releaseAsset(audioSource.clip);
                audioSource.destroy();
                //@ts-ignore
                this._mapMusic[name] = null;
            }
        }
    }

    /**
     * 移除不需要的音效
     * @param sounds 
     */
    public removeSound(sounds: Array<string>) {
        for (let i = 0; i < sounds.length; i++) {
            const name = sounds[i];
            const arrAudioSource = this._mapSound.get(name);
            if (arrAudioSource && arrAudioSource.length) {
                for (let j = 0; j < arrAudioSource.length; j++) {
                    if (this._curSounds.indexOf(arrAudioSource[j]) >= 0) {
                        this._curSounds.splice(this._curSounds.indexOf(arrAudioSource[j]), 1);
                    }
                }
                this._mapSound.delete(name);
                arrAudioSource.forEach((audioSource: any) => {
                    assetManager.releaseAsset(audioSource.clip);
                    audioSource.destroy();
                })
            }
        }
    }

    /**
     * 设置音乐音量
     *
     * @param {number} flag
     * @memberof AudioManager
     */
    public setMusic(flag: number) {
        this.musicVolume = flag;
        console.log("###设置音乐音量", flag);

        //@ts-ignore
        for (let value of this._mapMusic.values()) {
            if (value) {
                value.volume = this.musicVolume * this.mainVolume;
            }
        }
        Configuration.instance.setConfigData(ConfigDataName.MusicVolume, `${parseFloat(flag.toFixed(2))}`);
    }

    /**
     * 设置音乐音量但是不用保存
     *
     * @param {number} flag
     * @memberof AudioManager
     */
    public setMusicWithoutSave(flag: number) {
        //@ts-ignore
        for (let value of this._mapMusic.values()) {
            if (value) {
                value.volume = flag * this.mainVolume;
            }
        }
    }

    public setSound(flag: number) {
        this.soundVolume = flag;
        console.log("###设置音效音量", flag);

        //@ts-ignore
        for (const value of this._mapSound.values()) {
            if (value && value.length) {
                value.forEach((audio: AudioSource) => {
                    audio.volume = this.soundVolume * this.mainVolume;
                })
            }
        }

        for (let idx = 0; idx < this._curSounds.length; idx++) {
            let audio = this._curSounds[idx];
            audio.volume = this.soundVolume * this.mainVolume;
        }
        Configuration.instance.setConfigData(ConfigDataName.SoundVolume, `${parseFloat(flag.toFixed(2))}`);
    }

}
