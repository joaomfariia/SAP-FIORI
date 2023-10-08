sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("brasileirao.controller.Main", {
      onInit: function () {
        // Define new objects for championship data
        var generalDetails = {};
        var classification = {};
        var matches = {};

        // Create new models
        var modelData = new JSONModel();
        var classificationData = new JSONModel();
        var matchesData = new JSONModel();

        // Insert data into models
        modelData.setData(generalDetails);
        classificationData.setData(classification);
        matchesData.setData(matches);

        // Bind the data to the view(screen)
        var screen = this.getView();
        screen.setModel(modelData, 'generalDetailsModel');
        screen.setModel(classificationData, 'tableModel');
        screen.setModel(matchesData, 'matchesModel');

        // Calling the functions that calls the API
        this.onSearchDetails();   
        this.onSearchClassification();        
      },

      // Create a function that request the data from an API request (GeneralDetails)
      onSearchDetails: function(){
        var oDetailsModel = this.getView().getModel('generalDetailsModel');
        // API parameters
        var callDetailsSettings = {
          url: 'https://api.api-futebol.com.br/v1/campeonatos/10',
          method: 'GET',
          async: true,
          crossDomain: true,
          headers: {
            'Authorization': 'Bearer test_e4d03933e47569448619e0313865f4'
          }
        };
        // Calling API using ajax
        // .done function used to handle response from the call
        $.ajax(callDetailsSettings).done(
          function(response){
            // Change model data
            oDetailsModel.setData(response);
            var actualRound = response.rodada_atual.rodada
            this.onSearchMatches(actualRound);
          }.bind(this) // Binding this function to the main program because it's outside of it
        )
      },

      // Create a function that request the data from an API request (Classification)
      onSearchClassification: function(){
        var oTableModel = this.getView().getModel('tableModel');
        // API parameters
        var callClassSettings = {
          url: 'https://api.api-futebol.com.br/v1/campeonatos/10/tabela',
          method: 'GET',
          async: true,
          crossDomain: true,
          headers: {
            'Authorization': 'Bearer test_e4d03933e47569448619e0313865f4'
          }
        };
        // Calling API using AJAX
        // .done function used to handle response from the call
        $.ajax(callClassSettings).done(
          function(response){
            // Change model data
            // .done function used to handle response from the call
            oTableModel.setData(
              {
                'Classification': response
              }                
            );
          }.bind(this)  // Binding this function to the main program because it's outside of it
        )
      },

      // Create a function that request the data from an API request (Matches)
      onSearchMatches: function(actualRound){
        var oMatchesModel = this.getView().getModel('matchesModel');
        // API parameters
        var callMatchesSettings = {
          url: 'https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/' + actualRound,
          method: 'GET',
          async: true,
          crossDomain: true,
          headers: {
            'Authorization': 'Bearer test_e4d03933e47569448619e0313865f4'
          }
        };
        // Calling API using AJAX
        // .done function used to handle response from the call
        $.ajax(callMatchesSettings).done(
          function(response){
            var matchEnded = 'Ended';
            var matchGoing = 'On going';
            var matchSchedule = 'Scheduled';
            var matchPreGame = 'Pre-game';
            // Loop that change match status to english language
            response.partidas.forEach(function(part, index) {
              if (this.partidas[index].status == 'finalizado'){
                this.partidas[index].status = matchEnded;

              } else if (this.partidas[index].status == 'andamento'){
                this.partidas[index].status = matchGoing;

              } else if (this.partidas[index].status == 'agendado'){
                this.partidas[index].status = matchSchedule;

              } else if (this.partidas[index].status == 'pre-jogo'){
                this.partidas[index].status = matchPreGame;
              } 
          }, response); 
            // Change model data
            oMatchesModel.setData(response);
          }.bind(this)  // Binding this function to the main program because it's outside of it
        )
      }
    });
  }
);
