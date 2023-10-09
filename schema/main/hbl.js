let mongoose = require("mongoose");

//User Schema
let hblSchema = mongoose.Schema({ 
    shipper: {
        type: Object
    },
    consignee: {
        type: Object
    },
    notifyParty: {
        type: Object
    },
    preCarriageBy: {
      type: String,
    },
    placeOfReceiptByPreCarrier: {
      type: String,
    },
    oceanCarrier: {
      type: String,
    },
    source: {
      type: String,
    },
    contractReference: {
      type: String,
    },
    exportVessel: {
      type: String,
    },
    portOfLoading: {
      type: String,
    },
    loadingPier: {
      type: String,
    },
    placeOfDischarge: {
      type: String,
    },
    placeOfDelivery: {
      type: String,
    },
    typeOfMove: {
      type: String,
    },
    shipmentType: {
      type: String,
    },
    cargoItems: [
      {
        containerText: {
          type: String,

          trim: true,
        },
        containerType: {
          type: String,

          trim: true,
        },
        cargoText: {
          type: String,

          trim: true,
        },
        cargoType: {
          type: String,

          trim: true,
        },
        marksAndNumbers: {
          type: String,

          trim: true,
        },
        description: {
          type: String,

          trim: true,
        },
        grossWeight: {
          type: String,

          trim: true,
        },
        measurement: {
          type: String,

          trim: true,
        },
      },
    ],
    declaredValue: {
      type: String
    },
    freightRates: {
      type: Object
    },
    issuedDetails:{
        type: Object
    },
    blDate: {
        type: String,
        require: true
    },
    correction: {
      type: [Object]
    },
    systemInfo: {
      type: Object,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("hbl", hblSchema);
