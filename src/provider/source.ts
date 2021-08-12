import deepcopy from 'deepcopy';
import moment from 'moment';

import { randomGenerator } from './helper';
import { TableType } from '../types/types';
// Class to fetch the data.
export default class Source {
  /**
   * Function combine actual data and predicted data.
   * @param {number} days number of days selected
   * @param {string} product selected product
   * @param {string} startDate start date for the data to be fetched
   * @returns
   */
  async getData(
    days: number,
    product: string,
    startDate: Date
  ): Promise<{
    tableData: TableType;
    lowerRange: number[];
    upperRange: number[];
    labels: string[];
  }> {
    let rangeValues = this.actualData(days, product);

    let startTempDate = new Date(startDate);

    let labels = [],
      tableData = [];

    for (let i = 0; i <= days; i++) {
      let date: Date = deepcopy(startTempDate);
      labels.push(
        moment(date.setDate(startTempDate.getDate() + i)).format('yyyy-MM-DD')
      );

      tableData.push({
        id: i,
        product: product,
        date: moment(date.setDate(startTempDate.getDate() + i)).format(
          'yyyy-MM-DD'
        ),
        value: rangeValues[i],
      });
    }
    let todaysIndex = labels.indexOf(moment(new Date()).format('yyyy-MM-DD'));

    let result = this.predictedData(rangeValues, todaysIndex);
    return {
      tableData: tableData,
      lowerRange: result.lowerRange,
      upperRange: result.upperRange,
      labels: labels,
    };
  }

  /**
   * Function to fetch actual data.
   * @param {number} days number of days selected
   * @param {string} product selected product
   * @returns
   */
  private actualData(days: number, product: string): number[] {
    return randomGenerator(days, product);
  }

  /**
   * Function to forecast future data.
   * @param {number[]} range
   * @param {number} stopIndex
   * @returns
   */
  private predictedData(range: number[], stopIndex: number) {
    let lowerRange = deepcopy(range),
      upperRange = deepcopy(range);
    for (let j = 0; j < range.length; j++) {
      if (j > stopIndex) {
        lowerRange[j] = range[j] * 0.95;
        upperRange[j] = range[j] * 1.05;
      }
    }

    return {
      lowerRange,
      upperRange,
    };
  }
}
