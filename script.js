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
      content: "Crime {Crime} occurred at {ILEADSStreet} with {Latitude} and {Longitude}."
    };

    const csvLayer = new CSVLayer({
      url: url,
      copyright: "Saint Louis Crime",
      popupTemplate: template
    });

    // Updated renderer for light blue, filled markers
    csvLayer.renderer = {
      type: "simple",
      symbol: {
        type: "point-3d",
        symbolLayers: [{
          type: "icon",
          resource: { primitive: "circle" },
          material: { color: [173, 216, 230, 1] }, // Light blue color
          size: 4 // Reduced size
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
        position: new Point({
          x: -90.1994, // St. Louis longitude
          y: 38.6270,  // St. Louis latitude
          z: 15000     // Closer initial zoom level
        }),
        heading: 0,
        tilt: 0
      }),
      constraints: {
        altitude: {
          min: 15000 // Allows closer zooming
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
