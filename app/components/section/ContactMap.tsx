"use client"

import { useEffect, useRef, useState } from "react"
import {
    Map,
    MapLocateControl,
    MapMarker,
    MapPopup,
    MapTileLayer,
    MapZoomControl,
} from "@/components/ui/map"
import { useMap } from "react-leaflet"
import type { LatLngExpression, Polyline, CircleMarker, Circle } from "leaflet"
import { Button } from "../ui/button"
import { LocateFixed, X } from "lucide-react"

// ── Destination ──────────────────────────────────────────────
const MIRPUR_SONI_HALL: LatLngExpression = [23.8069, 90.3685]

// ── Routing line + user-dot drawn directly on the Leaflet map ─
function LiveRoute({ userPos }: { userPos: [number, number] | null }) {
    const map = useMap()
    const routeRef = useRef<Polyline | null>(null)
    const pulseRef = useRef<CircleMarker | null>(null)
    const accuracyRef = useRef<Circle | null>(null)

    useEffect(() => {
        // Clean up previous layers
        routeRef.current?.remove()
        pulseRef.current?.remove()
        accuracyRef.current?.remove()

        if (!userPos) return

        // ✅ Lazily import L inside useEffect — never runs on the server
        import("leaflet").then((L) => {
            // Accuracy ring
            accuracyRef.current = L.circle(userPos, {
                radius: 40,
                color: "#4285F4",
                fillColor: "#4285F4",
                fillOpacity: 0.08,
                weight: 1,
                dashArray: "4 4",
            }).addTo(map)

            // Pulsing user dot
            pulseRef.current = L.circleMarker(userPos, {
                radius: 10,
                color: "#fff",
                fillColor: "#4285F4",
                fillOpacity: 1,
                weight: 3,
            }).addTo(map)

            // Dashed route line
            routeRef.current = L.polyline(
                [userPos, MIRPUR_SONI_HALL as [number, number]],
                {
                    color: "#4285F4",
                    weight: 4,
                    opacity: 0.85,
                    dashArray: "10 8",
                    lineCap: "round",
                }
            ).addTo(map)

            // Fit both points in view with padding
            map.fitBounds(
                L.latLngBounds([userPos, MIRPUR_SONI_HALL as [number, number]]),
                { padding: [60, 60] }
            )
        })

        return () => {
            routeRef.current?.remove()
            pulseRef.current?.remove()
            accuracyRef.current?.remove()
        }
    }, [userPos, map])

    return null
}

// ── Distance helper ────────────────────────────────────────────
function haversineKm(a: [number, number], b: [number, number]) {
    const R = 6371
    const dLat = ((b[0] - a[0]) * Math.PI) / 180
    const dLon = ((b[1] - a[1]) * Math.PI) / 180
    const lat1 = (a[0] * Math.PI) / 180
    const lat2 = (b[0] * Math.PI) / 180
    const x =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
}

// ── Main component ─────────────────────────────────────────────
const ContactMap = () => {
    const [userPos, setUserPos] = useState<[number, number] | null>(null)
    const [locating, setLocating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const watchIdRef = useRef<number | null>(null)

    const startTracking = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.")
            return
        }
        setLocating(true)
        setError(null)

        watchIdRef.current = navigator.geolocation.watchPosition(
            (pos) => {
                setUserPos([pos.coords.latitude, pos.coords.longitude])
                setLocating(false)
            },
            (err) => {
                setError("Could not get your location. Please allow location access.")
                setLocating(false)
                console.error(err)
            },
            { enableHighAccuracy: true, maximumAge: 5000 }
        )
    }

    const stopTracking = () => {
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current)
            watchIdRef.current = null
        }
        setUserPos(null)
        setLocating(false)
    }

    useEffect(
        () => () => {
            if (watchIdRef.current !== null)
                navigator.geolocation.clearWatch(watchIdRef.current)
        },
        []
    )

    const distanceKm = userPos
        ? haversineKm(userPos, MIRPUR_SONI_HALL as [number, number])
        : null

    return (
        <div className="w-[95%] max-w-400 mx-auto space-y-3">
            {/* Controls bar */}
            <div className="flex justify-between items-center gap-3 flex-wrap">
                <div>
                    <h2 className="heading-2">Location</h2>
                </div>

                <div className="flex gap-1">
                    <div>
                        {!userPos ? (
                            <Button onClick={startTracking} disabled={locating}>
                                {locating ? (
                                    <>
                                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                                        Locating…
                                    </>
                                ) : (
                                    <>
                                        <LocateFixed /> Show My Location & Route
                                    </>
                                )}
                            </Button>
                        ) : (
                            <Button onClick={stopTracking}>
                                <X /> Clear Route
                            </Button>
                        )}
                    </div>

                    <div>
                        {distanceKm !== null && (
                            <Button className="cursor-auto">
                                {distanceKm < 1
                                    ? `${Math.round(distanceKm * 1000)} m away`
                                    : `${distanceKm.toFixed(1)} km away`}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Map */}
            <div
                className="rounded-sm overflow-hidden border border-gray-200 h-60 lg:h-80"
            >
                <Map
                    center={MIRPUR_SONI_HALL}
                    zoom={14}
                    style={{ height: "100%", width: "100%" }}
                >
                    <MapTileLayer />
                    <MapZoomControl position="right-1 bottom-1" />
                    <MapLocateControl position="top-1 left-1" />

                    {/* Destination marker */}
                    <MapMarker position={MIRPUR_SONI_HALL}>
                        <MapPopup>
                            <div className="text-center p-2 min-w-50">
                                <h3 className="font-bold text-lg text-green-700">
                                    Mirpur 1 Market
                                </h3>
                                <p className="font-semibold text-blue-600">Soni Hall</p>
                                <p className="text-sm text-gray-600 mt-1">Mirpur-1, Dhaka</p>
                                <div className="border-t mt-2 pt-2 text-xs text-gray-400">
                                    23.8069° N, 90.3685° E
                                </div>
                            </div>
                        </MapPopup>
                    </MapMarker>

                    {/* Live route + user dot */}
                    <LiveRoute userPos={userPos} />
                </Map>
            </div>
        </div>
    )
}

export default ContactMap