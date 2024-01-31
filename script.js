      require(["esri/WebScene", "esri/layers/CSVLayer", "esri/views/SceneView"], (
        WebScene,
        CSVLayer,
        SceneView
      ) => {
        // If CSV files are not on the same domain as your website, a CORS enabled server
        // or a proxy is required.
        var url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";

        // Paste the url into a browser's address bar to download and view the attributes
        // in the CSV file. These attributes include:
        // * mag - magnitude
        // * type - earthquake or other event such as nuclear test
        // * place - location of the event
        // * time - the time of the event

        const template = {
          title: "Crime in Saint Louis",
          content: "Crime {Crime} occured at {ILEADSStreet} with {Latitude} and {Longitude}."
        };

        const csvLayer = new CSVLayer({
          url: url,
          copyright: "Saint Louis Crime",
          popupTemplate: template
        });

      csvLayer.renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
          type: "point-3d", // autocasts as new PointSymbol3D()
          // for this symbol we use 2 symbol layers, one for the outer circle
          // and one for the inner circle
          symbolLayers: [{
            type: "icon", // autocasts as new IconSymbol3DLayer()
            resource: { primitive: "circle" },
            material: { color: [0, 128, 255, 1] }, // Change color here
            size: 5
          }, {
            type: "icon", // autocasts as new IconSymbol3DLayer()
            resource: { primitive: "circle" },
            material: { color: [0, 128, 255, 0] }, // Change color here
            outline: { color: [0, 128, 255, 0.6], size: 1 }, // Change outline color here
            size: 25
          }]
        }
};


        const map = new WebScene({
          portalItem: {
            id: "a467ef1140de4e88acf34d38df9fb869"
          }
        });

        map.add(csvLayer);

        const view = new SceneView({
          container: "viewDiv",
          qualityProfile: "high",
          map: map,
          alphaCompositingEnabled: true,
          highlightOptions: {
            fillOpacity: 0,
            color: "#ffffff"
          },
          constraints: {
            altitude: {
              min: 700000
            }
          },
          environment: {
            background: {
              type: "color",
              color: [0, 0, 0, 0]
            },
            lighting: {
              type: "virtual"
            }
          }
        });
      });
