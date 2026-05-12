import { Duration } from "./Duration.js";
/**
 * This class handle a single race time for a given particicpant and sport type
 */
export class RaceResult {
       // TODO
      /**
     * id of participant
     * @type {string}
     * @private
     */
    _participantID;
    /**
     * id of participant
     * @type {string}
     * @private
     */
     _sportType;
     /**
     * id of participant
     * @type {Duration}
     * @private
     */
     _duration;
    
    /**
     * initialize a score object
     * @param {string} id 
     * @param {string} sportType 
     * @param {Duration} duration 
     * @param {Array} result 
     */
     constructor(id = "", sportType = "", duration = 0){
          this._participantID = id;
          this._sportType = sportType;
          this._duration = duration;
         
     }  

     
  }
