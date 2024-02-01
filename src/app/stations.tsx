export interface StationInfo {
  name: string,
  location: string,
  layout?: Array<LocationLayout>,
}

export interface LocationLayout {
  destinations: Array<string>,
  direction: string,
  destination_sign: string,
}

export const station_info : {
  [id: string]: StationInfo
} = {
  "GRV": {
    name: "Grove Street",
    location: "New Jersey",
  },
  "WTC": {
    name: "World Trade Center",
    location: "New York",
    layout: [
      {
        destinations: ["NWK", "JSQ"],
        direction: "down",
        destination_sign: "Newark",
      }, {
        destinations: ["HOB"],
        direction: "down",
        destination_sign: "Hoboken",
      }
    ]
  },
  "JSQ": {
    name: "Journal Square",
    location: "New Jersey",
  },
  "HOB": {
    name: "Hoboken",
    location: "New Jersey",
    layout: [
      {
        destinations: ["JSQ", "WTC"],
        direction: "down",
        destination_sign: "Newport",
      }, {
        destinations: ["33S"],
        direction: "up",
        destination_sign: "Christopher St",
      }
    ]
  },
  "09S": {
    name: "9th Street",
    location: "New York",
  },
  "23S": {
    name: "23rd Street",
    location: "New York",
  },
  "HAR": {
    name: "Harrison",
    location: "New Jersey",
  },
  "NEW": {
    name: "Newport",
    location: "New Jersey",
    layout: [
      {
        destinations: ["JSQ", "WTC"],
        direction: "down",
        destination_sign: "Grove St / Exchange Place",
      }, {
        destinations: ["HOB", "33S"],
        direction: "up",
        destination_sign: "Hoboken / Christopher St",
      }
    ]
  },
  "NWK": {
    name: "Newark",
    location: "New Jersey",
  },
  "EXP": {
    name: "Exchange Place",
    location: "New Jersey",
  },
  "CHR": {
    name: "Christopher Street",
    location: "New York",
  },
  "14S": {
    name: "14th Street",
    location: "New York",
  },
  "33S": {
    name: "33rd Street",
    location: "New York",
    layout: [
      {
        destinations: ["JSQ"],
        direction: "down",
        destination_sign: "Journal Square",
      }, {
        destinations: ["HOB"],
        direction: "down",
        destination_sign: "Hoboken",
      }
    ]
  },
};