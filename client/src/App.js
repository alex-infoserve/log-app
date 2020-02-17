import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

import { listLogEntries } from './API'

const App = () => {
  const [logEntries, setLogEntries] = useState([])
  const [showPopup, setShowPopup] = useState({})
  const [addEntryLocation, setAddEntryLocation] = useState(null)

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 5,
    longitude: -85,
    zoom: 2
  })

  useEffect(() => {
    /**
     * IIFE:
     * An Immediately-invoked Function Expression is a way to
     * execute functions immediately, as soon as they are created.
     * IIFEs are very useful because they don't pollute the global object,
     * and they are a simple way to isolate variables declarations
     */
    ;(async () => {
      const logEntries = await listLogEntries()
      console.log(logEntries)
      setLogEntries(logEntries)
    })()
  }, [])

  const showAddMarkerPopup = event => {
    const [longitude, latitude] = event.lngLat
    setAddEntryLocation({
      latitude,
      longitude
    })
  }

  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map(entry => (
        <>
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}

            /* offsetLeft={-12}
            offsetTop={-24} */
          >
            {/* <svg
              className='marker'
              style={{
                //width: `calc(1vmin * ${viewport.zoom})`,
                width: `${6 * viewport.zoom}px`,
                height: `${6 * viewport.zoom}px`
              }}
              viewBox='0 0 24 24'
              stroke-width='1.5'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
              <circle cx='12' cy='10' r='3'></circle>
            </svg> */}
            <div
              onClick={() =>
                setShowPopup({
                  //...showPopup,
                  [entry._id]: true
                })
              }
            >
              <svg
                className='marker yellow'
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`
                }}
                version='1.1'
                id='Layer_1'
                x='0px'
                y='0px'
                viewBox='0 0 512 512'
              >
                <g>
                  <g>
                    <path
                      d='M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z'
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              dynamicPosition={true}
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup({})}
              anchor='top'
            >
              <div className='popup'>
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  Visited on: {new Date(entry.visitDate).toLocaleDateString()}
                </small>
              </div>
            </Popup>
          ) : null}
        </>
      ))}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <div>
              <svg
                className='marker red'
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`
                }}
                version='1.1'
                id='Layer_1'
                x='0px'
                y='0px'
                viewBox='0 0 512 512'
              >
                <g>
                  <g>
                    <path
                      d='M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z'
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          <Popup
            dynamicPosition={true}
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntryLocation(null)}
            anchor='top'
          >
            <div className='popup'>
              <h3>Add your new log here</h3>
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  )
}

export default App
