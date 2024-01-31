      
require(["esri/WebScene", "esri/layers/CSVLayer", "esri/views/SceneView", "esri/geometry/Point", "esri/Camera"], (
    WebScene,
    CSVLayer,
    SceneView,
    Point,
    Camera
  ) => {
    var url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";

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
      type: "simple",
      symbol: {
        type: "point-3d",
        symbolLayers: [{
          type: "icon",
          resource: { primitive: "circle" },
          material: { color: [255, 0, 0, 1] }, // Changed color to red
          size: 5
        }, {
          type: "icon",
          resource: { primitive: "circle" },
          material: { color: [0, 128, 255, 0] },
          outline: { color: [0, 128, 255, 0.6], size: 1 }, // Changed outline color to red
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
      camera: new Camera({
        position: new Point({ // Sets the initial position to St. Louis
          x: -90.1994,
          y: 38.6270,
          z: 700000 // Adjust this value as needed to change zoom level
        }),
        heading: 0,
        tilt: 0
      }),
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



