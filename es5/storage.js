"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var localforage_1 = require("localforage");
var localforage_cordovasqlitedriver_1 = require("localforage-cordovasqlitedriver");
/**
 * Storage is an easy way to store key/value pairs and JSON objects.
 * Storage uses a variety of storage engines underneath, picking the best one available
 * depending on the platform.
 *
 * When running in a native app context, Storage will prioritize using SQLite, as it's one of
 * the most stable and widely used file-based databases, and avoids some of the
 * pitfalls of things like localstorage and IndexedDB, such as the OS deciding to clear out such
 * data in low disk-space situations.
 *
 * When running in the web or as a Progressive Web App, Storage will attempt to use
 * IndexedDB, WebSQL, and localstorage, in that order.
 *
 * @usage
 * First, if you'd like to use SQLite, install the cordova-sqlite-storage plugin:
 * ```bash
 * cordova plugin add cordova-sqlite-storage --save
 * ```
 *
 * Next, install the package (comes by default for Ionic 2 apps >= RC.0)
 *
 * ```bash
 * npm install --save @ionic/storage
 * ```
 *
 * Next, add it to the providers list in your `NgModule` declaration (for example, in `src/app.module.ts`):
 *
 * ```typescript
 * import { Storage } from '@ionic/storage';
 *
 * @NgModule({
 *   declarations: [
 *     // ...
 *   ],
 *   imports: [
 *     IonicModule.forRoot(MyApp)
 *   ],
 *   bootstrap: [IonicApp],
 *   entryComponents: [
 *     // ...
 *   ],
 *   providers: [
 *     Storage
 *   ]
 * })
 * export class AppModule {}
 *```
 *
 * Finally, inject it into any of your components or pages:
 * ```typescript
 * import { Storage } from '@ionic/storage';

 * export class MyApp {
 *   constructor(storage: Storage) {
 *
 *      // set a key/value
 *      storage.set('name', 'Max');
 *
 *      // Or to get a key/value pair
 *      storage.get('name').then((val) => {
 *        console.log('Your name is', val);
 *      })
 *   }
 * }
 * ```
 */
var Storage = (function () {
    function Storage() {
        this._dbPromise = new Promise(function (resolve, reject) {
            var db;
            localforage_1.default.defineDriver(localforage_cordovasqlitedriver_1.default).then(function () {
                db = localforage_1.default.createInstance({
                    name: '_ionicstorage',
                    storeName: '_ionickv'
                });
            }).then(function () { return db.setDriver([
                localforage_cordovasqlitedriver_1.default._driver,
                localforage_1.default.INDEXEDDB,
                localforage_1.default.WEBSQL,
                localforage_1.default.LOCALSTORAGE
            ]); }).then(function () {
                console.info('Ionic Storage driver:', db.driver());
                resolve(db);
            }).catch(function (reason) { return reject(reason); });
        });
    }
    /**
     * Get the value assocated with the given key.
     * @return Promise that resolves with the value
     */
    Storage.prototype.get = function (key) {
        return this._dbPromise.then(function (db) { return db.getItem(key); });
    };
    /**
     * Set the value for the given key.
     * @param key the key to identify this value
     * @param value the value for this key
     * @return Promise that resolves when the value is set
     */
    Storage.prototype.set = function (key, value) {
        return this._dbPromise.then(function (db) { return db.setItem(key, value); });
    };
    /**
     * Remove any value associated with this key.
     * @param key the key to identify this value
     * @return Promise that resolves when the value is removed
     */
    Storage.prototype.remove = function (key) {
        return this._dbPromise.then(function (db) { return db.removeItem(key); });
    };
    /**
     * Clear the entire key value store. WARNING: HOT!
     * @return Promise that resolves when the kv store is cleared
     */
    Storage.prototype.clear = function () {
        return this._dbPromise.then(function (db) { return db.clear(); });
    };
    /**
     * @return the number of keys stored.
     */
    Storage.prototype.length = function () {
        return this._dbPromise.then(function (db) { return db.length(); });
    };
    /**
     * @return the keys in the store.
     */
    Storage.prototype.keys = function () {
        return this._dbPromise.then(function (db) { return db.keys(); });
    };
    /**
     * Iterate through each key,value pair.
     * @param iteratorCallback a callback of the form (value, key, iterationNumber)
     */
    Storage.prototype.forEach = function (iteratorCallback) {
        return this._dbPromise.then(function (db) { return db.iterate(iteratorCallback); });
    };
    return Storage;
}());
Storage = __decorate([
    core_1.Injectable()
], Storage);
exports.Storage = Storage;
