
import { Duration } from "../model/Duration.js";
import { RaceResult } from "../model/RaceResult.js";
import fs from "fs";
/**
 * This class handle the race results management system.
 */
export class RaceResultsService {
  /**
   * The list of race results.
   * @type {Array<RaceResult>}
   * @private
   */
  _raceResults = [];

  get raceResults() {
    return this._raceResults;
  }

  /**
   * Adds a new race result to the race list.
   * @param {RaceResult} result - The prace result.
   */
  addRaceResult(result) {
    // TODO
    this._raceResults.push(result);
  }

  /**
   * Saves the race results list to a JSON file.
   * @param {string} filePath - The path to the file where data should be saved.
   */
  saveToFile(filePath) {
    // TODO
    const data = this._raceResults.map(r => ({
        participantID: r._participantID,
        sportType: r._sportType,
        duration: r._duration.toString()
    }));
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  /**
   * Loads the race results list from a JSON file.
   * @param {string} filePath - The path to the file to load data from.
   * @returns {boolean} True if loading was successful, false otherwise.
   */
  loadFromFile(filePath) {
    // TODO
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      this._raceResults = JSON.parse(data);
    }
    catch (error){
      console.error("Error loading file:", error);  
    }
    
  }

  /**
   * Retrieves the race time for a given participant and sport.
   * @param {string} participantId - Participant ID.
   * @param {string} sport - Sport name.
   * @returns {Duration|null} Duration if found, else null.
   */
  getTimeForParticipant(participantId, sport) {
       // TODO
       const participant = this._raceResults.find((element) => 
        element._participantID === participantId &&
        element._sportType === sport
      );

      return (participant) ? participant._duration : null;
  }

  /**
   * Computes the total time for a given participant by summing their race times.
   * @param {string} participantId - The ID of the participant.
   * @returns {Duration|null} The total Duration object if found, otherwise null.
   */
  getTotalTimeForParticipant(participantId) {
        // TODO
        const totalTime = this._raceResults.filter((element) => 
          element._participantID === participantId
        );
        let d1 = new Duration();
        totalTime.forEach(element => {
          d1 = d1.plus(element._duration)
        });
        return d1;
  }
}
