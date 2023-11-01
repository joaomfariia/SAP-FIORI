sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("sampleapp.controller.View", {
      onInit: function () {
        var oData = {
          Title: "My Orders",
          SalesOrders: [
            {
              SalesOrderId: "0001",
              CustomerName: "Amazon",
              Status: "Warning",
              State: "Warning",
              GrossAmount: "899",
              Unit: "USD",
            },
            {
              SalesOrderId: "0002",
              CustomerName: "Apple",
              Status: "Error",
              State: "Error",
              GrossAmount: "429",
              Unit: "USD",
            },
            {
              SalesOrderId: "0003",
              CustomerName: "SAP",
              Status: "Completed",
              State: "Success",
              GrossAmount: "1349",
              Unit: "USD",
            },
          ],
        };
        var oModel = new JSONModel(oData);
        this.getView().setModel(oModel);
      },

      onSearch: function () {
        MessageToast.show("Search Button clicked!");
      },

      onSort: function () {
        MessageToast.show("Sort Button clicked!");
      },

      onGroup: function () {
        MessageToast.show("Group Button clicked!");
      },
    });
  }
);
