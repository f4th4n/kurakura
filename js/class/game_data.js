// ------------------------------------------------------------------------------------------------ Expose

class GameData {
    constructor(saveKey) {
        this.defaultValues = {
            char_level: {
                val: 1, // test
                type: 'int'
            },
            char_life: {
                val: f.config.maxLife,
                type: 'int'
            },
            level_stat: {
                val: [], // [{ level_id: 5, died: 100, is_finished: 1 }]
                type: 'array'
            }
        }

        this.saveKey = saveKey
        this.dataCache = this._load()
    }

    load() {
        return this.dataCache
    }

    search(key, val) {
        for(let cache of this.dataCache) {
            // `cache` for example { level_id: 5, after_died: 100 }
            if(cache[key] == val) return cache
        }
    }

    update(row) {
        for(let levelStatObj of this.dataCache) {
            if(levelStatObj.level_id == row.level_id) {
                levelStatObj = row
            }
        }
        this.save(this.dataCache)
    }

    /*
        desc: actually write save game data to file
        note: this method use promise to prevent code blocking
    */
    save(saveVal) {
        var that = this

        this.dataCache = saveVal

        if(this.defaultValues[this.saveKey].type === 'int') {
            saveVal = parseInt(saveVal)
        } else if(this.defaultValues[this.saveKey].type === 'array') {
            saveVal = JSON.stringify(saveVal)
        }

        return new Promise(function(resolve, reject) {
            if(cc.sys.isNative) {
                var path = jsb.fileUtils.getWritablePath()
                jsb.fileUtils.writeToFile({data: saveVal}, path + that.saveKey)
            } else {
                cc.sys.localStorage.setItem(that.saveKey, saveVal)
            }
            return resolve()
        })
    }

    _load() {
        var fileContent

        if (cc.sys.isNative) {
            var path = jsb.fileUtils.getWritablePath()
            if (jsb.fileUtils.isFileExist(path + this.saveKey)) {
                var tmp = jsb.fileUtils.getValueMapFromFile(path+this.saveKey)
                fileContent = JSON.parse(tmp.data)
            }
        } else {
            var data = cc.sys.localStorage.getItem(this.saveKey)
            if (data != null) {
                fileContent = JSON.parse(data)
            }
        }

        if(fileContent === null || fileContent === undefined || fileContent.length === 0) {
            const defaultValue = this.defaultValues[this.saveKey].val
            this.save(defaultValue)
            return defaultValue
        }

        if(this.defaultValues[this.saveKey].type === 'int') {
            fileContent = parseInt(fileContent)
        }

        return fileContent
    }
}
