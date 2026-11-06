"use client";
import LoadingSequence from "./LoadingSequence";

export default function SimulationLoader({ ready = false }) {
    return <LoadingSequence ready={ready} />;
}
