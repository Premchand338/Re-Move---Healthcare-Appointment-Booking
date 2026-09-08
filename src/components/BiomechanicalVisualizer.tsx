import React, { useState, useRef, useEffect } from 'react';
import { JointId } from '../types';
import { CLINICAL_JOINTS } from '../data/clinicalData';
import { RotateCw, ZoomIn, ZoomOut, Maximize2, Shield, Activity, Compass, Cpu, Layers } from 'lucide-react';

interface BiomechanicalVisualizerProps {
  selectedJoint: JointId;
  onSelectJoint: (id: JointId) => void;
  onStartAssessment: (id: JointId) => void;
  compact?: boolean;
}

export const BiomechanicalVisualizer: React.FC<BiomechanicalVisualizerProps> = ({
  selectedJoint,
  onSelectJoint,
  onStartAssessment,
  compact = false
}) => {
  const [viewMode, setViewMode] = useState<'3D' | '2D'>('3D');
  const [renderLayer, setRenderLayer] = useState<'biotech' | 'muscle' | 'xray'>('biotech');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const activeJointData = CLINICAL_JOINTS[selectedJoint] || CLINICAL_JOINTS.knee;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX.current;
    setRotationAngle((prev) => (prev + delta * 0.5) % 360);
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Joints with responsive 3D projection positions
  const jointNodes: { id: JointId; name: string; y: number; xOffset: number; depth: number }[] = [
    { id: 'cervical', name: 'Cervical Spine', y: 72, xOffset: 0, depth: 0 },
    { id: 'shoulder', name: 'Glenohumeral', y: 110, xOffset: -46, depth: 8 },
    { id: 'spine', name: 'Axial Spine (L4-S1)', y: 195, xOffset: 0, depth: -6 },
    { id: 'hip', name: 'Acetabulofemoral', y: 228, xOffset: -28, depth: 4 },
    { id: 'knee', name: 'Patellofemoral', y: 315, xOffset: -30, depth: 14 },
    { id: 'ankle', name: 'Talocrural', y: 405, xOffset: -30, depth: 6 }
  ];

  // Calculate rotated X offset based on rotation angle
  const rad = (rotationAngle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return (
    <div
      id="biomechanical-visualizer"
      className="relative flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-xl select-none"
    >
      {/* Visualizer Top Bar with Medical Telemetry & Mode Switchers */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#FAFAF8] border-b border-neutral-200 text-xs text-neutral-600">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-clinical-mono text-[11px] tracking-wider text-neutral-900 font-bold">
            3D REAL BODY ENGINE
          </span>
          <span className="hidden sm:inline text-neutral-300">|</span>
          <span className="hidden sm:inline text-neutral-500 font-clinical-mono text-[10px]">
            Kinetic 3D Musculoskeletal Model
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-neutral-100 border border-neutral-300 rounded-lg p-0.5 shadow-2xs">
            <button
              onClick={() => setViewMode('3D')}
              className={`px-2.5 py-0.5 rounded-md text-[10px] font-clinical-mono transition-colors cursor-pointer ${
                viewMode === '3D' ? 'bg-white text-neutral-900 font-bold shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              3D
            </button>
            <button
              onClick={() => setViewMode('2D')}
              className={`px-2.5 py-0.5 rounded-md text-[10px] font-clinical-mono transition-colors cursor-pointer ${
                viewMode === '2D' ? 'bg-white text-neutral-900 font-bold shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              2D
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1 ml-2 text-neutral-500">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn size={13} />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              className="p-1 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut size={13} />
            </button>
            <button
              onClick={() => {
                setRotationAngle(0);
                setZoomLevel(1);
              }}
              className="p-1 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors cursor-pointer"
              title="Reset angle"
            >
              <RotateCw size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Layer selector bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-neutral-200 text-[11px] font-clinical-mono">
        <div className="flex items-center gap-2 text-neutral-600">
          <span className="font-semibold text-neutral-700">Layer:</span>
          <button
            onClick={() => setRenderLayer('biotech')}
            className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
              renderLayer === 'biotech'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
            }`}
          >
            Biotech
          </button>
          <button
            onClick={() => setRenderLayer('muscle')}
            className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
              renderLayer === 'muscle'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
            }`}
          >
            Muscle Vol
          </button>
          <button
            onClick={() => setRenderLayer('xray')}
            className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
              renderLayer === 'xray'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
            }`}
          >
            X-Ray
          </button>
        </div>

        <div className="text-[10px] text-neutral-500 font-clinical-mono hidden sm:block">
          Drag to rotate 360° · Click joint pin
        </div>
      </div>

      {/* Interactive Anatomy Canvas */}
      <div
        className="relative w-full h-[380px] md:h-[430px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing bg-radial from-neutral-50 to-neutral-100/70 bg-grid-light"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Medical Grid & Coordinate Overlay */}
        <div className="absolute top-3 left-3 text-[10px] font-clinical-mono text-neutral-500 pointer-events-none flex flex-col gap-0.5">
          <span>ROT: {Math.round(rotationAngle)}°</span>
          <span>SCALE: {zoomLevel.toFixed(1)}x</span>
          <span>TOLERANCE: ±0.4mm</span>
        </div>

        {/* 3D Anatomical Human Biomechanics SVG Representation */}
        <div
          className="relative transition-transform duration-75"
          style={{
            transform: `scale(${zoomLevel})`,
            width: '260px',
            height: '440px'
          }}
        >
          <svg viewBox="0 0 260 460" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="boneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A0AEC0" />
                <stop offset="50%" stopColor="#718096" />
                <stop offset="100%" stopColor="#4A5568" />
              </linearGradient>
              <linearGradient id="cyanLine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="0.2" />
              </linearGradient>
              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Architectural Centerline & Grid Axis */}
            <line
              x1="130"
              y1="20"
              x2="130"
              y2="445"
              stroke="#333333"
              strokeWidth="0.75"
              strokeDasharray="3 3"
            />
            {/* Cross axis indicators */}
            <circle cx="130" cy="228" r="70" fill="none" stroke="#222222" strokeWidth="0.5" strokeDasharray="2 4" />

            {/* Cranium / Head */}
            <ellipse
              cx={130 + sin * 3}
              cy="48"
              rx={18 * (0.9 + cos * 0.1)}
              ry="24"
              fill={renderLayer === 'xray' ? 'none' : '#181818'}
              stroke="#666666"
              strokeWidth="1.2"
            />
            <path
              d={`M ${130 - 12} 48 Q ${130} ${56 + sin * 4} ${130 + 12} 48`}
              stroke="#718096"
              strokeWidth="0.8"
              fill="none"
            />

            {/* Cervical Vertebrae (C1-C7) */}
            <g stroke="#718096" strokeWidth="1.2" fill={renderLayer === 'xray' ? '#FFF' : '#2D3748'}>
              <rect x="126" y="70" width="8" height="3" rx="1" />
              <rect x="125" y="74" width="10" height="3" rx="1" />
              <rect x="124" y="78" width="12" height="3" rx="1" />
              <rect x="124" y="82" width="12" height="3" rx="1" />
            </g>

            {/* Clavicles & Scapular Yoke */}
            <path
              d={`M ${130 - 45 * cos} ${98 + 4 * sin} Q 130 92 ${130 + 45 * cos} ${98 - 4 * sin}`}
              stroke="#CBD5E1"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Rib Cage / Thorax Basket with Kinetic Ribs */}
            <g stroke="#64748B" strokeWidth="1" fill="none" opacity={renderLayer === 'muscle' ? 0.35 : 0.85}>
              {[-3, -2, -1, 0, 1, 2, 3].map((rIndex) => {
                const ry = 115 + rIndex * 9;
                const widthFactor = 36 - Math.abs(rIndex) * 3;
                return (
                  <ellipse
                    key={rIndex}
                    cx={130 + sin * 5}
                    cy={ry}
                    rx={widthFactor * (0.95 + cos * 0.05)}
                    ry={7}
                    strokeDasharray={renderLayer === 'biotech' ? '2 2' : 'none'}
                  />
                );
              })}
            </g>

            {/* Thoracic & Lumbar Spine Column (L1-L5) */}
            <path
              d={`M 130 90 L ${130 + sin * 8} 140 L 130 190 L ${130 - sin * 6} 228`}
              stroke="#10B981"
              strokeWidth="2.2"
              fill="none"
            />
            {/* Vertebral disc markers */}
            {[140, 152, 164, 176, 188, 200].map((vy, i) => (
              <circle
                key={i}
                cx={130 + sin * (i % 2 === 0 ? 3 : -3)}
                cy={vy}
                r="3"
                fill="#1E293B"
                stroke="#F1F5F9"
                strokeWidth="1.2"
              />
            ))}

            {/* Pelvis & Sacrum Bone Structure */}
            <path
              d={`M ${130 - 36 * cos} 220 C ${130 - 32 * cos} 205, ${130 + 32 * cos} 205, ${130 + 36 * cos} 220 C ${130 + 26 * cos} 242, ${130 - 26 * cos} 242, ${130 - 36 * cos} 220 Z`}
              fill={renderLayer === 'muscle' ? 'rgba(16, 185, 129, 0.2)' : '#1E293B'}
              stroke="#94A3B8"
              strokeWidth="1.8"
            />

            {/* Left Arm & Forearm */}
            <g opacity="0.9">
              <line
                x1={130 - 45 * cos}
                y1={98 + 4 * sin}
                x2={130 - 58 * cos}
                y2="155"
                stroke="#94A3B8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx={130 - 58 * cos} cy="155" r="4" fill="#0F172A" stroke="#94A3B8" strokeWidth="1.2" />
              <line
                x1={130 - 58 * cos}
                y1="155"
                x2={130 - 64 * cos}
                y2="210"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>

            {/* Right Arm & Forearm */}
            <g opacity="0.9">
              <line
                x1={130 + 45 * cos}
                y1={98 - 4 * sin}
                x2={130 + 58 * cos}
                y2="155"
                stroke="#94A3B8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx={130 + 58 * cos} cy="155" r="4" fill="#0F172A" stroke="#94A3B8" strokeWidth="1.2" />
              <line
                x1={130 + 58 * cos}
                y1="155"
                x2={130 + 64 * cos}
                y2="210"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>

            {/* Left Lower Extremity (Femur, Knee, Tibia) */}
            <g>
              <line
                x1={130 - 24 * cos}
                y1="235"
                x2={130 - 28 * cos - sin * 12}
                y2="315"
                stroke="#CBD5E1"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Knee joint condyle */}
              <circle
                cx={130 - 28 * cos - sin * 12}
                cy="315"
                r="6"
                fill="#0F172A"
                stroke="#CBD5E1"
                strokeWidth="1.5"
              />
              {/* Lower leg Tibia & Fibula */}
              <line
                x1={130 - 28 * cos - sin * 12}
                y1="315"
                x2={130 - 28 * cos - sin * 6}
                y2="405"
                stroke="#94A3B8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Foot lever */}
              <line
                x1={130 - 28 * cos - sin * 6}
                y1="405"
                x2={130 - 36 * cos - sin * 6}
                y2="424"
                stroke="#CBD5E1"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* Right Lower Extremity (Femur, Knee, Tibia) */}
            <g opacity="0.85">
              <line
                x1={130 + 24 * cos}
                y1="235"
                x2={130 + 28 * cos + sin * 12}
                y2="315"
                stroke="#CBD5E1"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Knee condyle */}
              <circle
                cx={130 + 28 * cos + sin * 12}
                cy="315"
                r="6"
                fill="#0F172A"
                stroke="#CBD5E1"
                strokeWidth="1.5"
              />
              {/* Lower leg */}
              <line
                x1={130 + 28 * cos + sin * 12}
                y1="315"
                x2={130 + 28 * cos + sin * 6}
                y2="405"
                stroke="#94A3B8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Foot lever */}
              <line
                x1={130 + 28 * cos + sin * 6}
                y1="405"
                x2={130 + 36 * cos + sin * 6}
                y2="424"
                stroke="#CBD5E1"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* Muscle Volume Overlay (when in muscle layer) */}
            {renderLayer === 'muscle' && (
              <g fill="#EF4444" opacity="0.2">
                <ellipse cx={130 - 30 * cos} cy="275" rx="14" ry="34" />
                <ellipse cx={130 + 30 * cos} cy="275" rx="14" ry="34" />
                <ellipse cx={130 - 30 * cos} cy="360" rx="10" ry="26" />
                <ellipse cx={130 + 30 * cos} cy="360" rx="10" ry="26" />
              </g>
            )}

            {/* Interactive Anatomical Joint Hotspots with Kinetic Target Rings */}
            {jointNodes.map((node) => {
              const isSelected = selectedJoint === node.id;
              // 3D projected coordinates based on rotation
              const posX = 130 + node.xOffset * cos + node.depth * sin;
              const posY = node.y;

              return (
                <g
                  key={node.id}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectJoint(node.id);
                  }}
                >
                  {/* Subtle target ring */}
                  <circle
                    cx={posX}
                    cy={posY}
                    r={isSelected ? 16 : 9}
                    fill={isSelected ? 'rgba(16, 185, 129, 0.25)' : 'transparent'}
                    stroke={isSelected ? '#34D399' : '#64748B'}
                    strokeWidth={isSelected ? '1.5' : '1'}
                    strokeDasharray={isSelected ? 'none' : '2 2'}
                    className="transition-all duration-200"
                  />

                  {/* Pulsing inner dot */}
                  <circle
                    cx={posX}
                    cy={posY}
                    r={isSelected ? 6 : 4}
                    fill={isSelected ? '#34D399' : '#94A3B8'}
                    stroke="#0A0A0A"
                    strokeWidth="1.5"
                    className="transition-transform group-hover:scale-125"
                  />

                  {/* Connecting indicator line & label when active */}
                  {isSelected && (
                    <g>
                      <line
                        x1={posX + 8}
                        y1={posY}
                        x2={posX + 28}
                        y2={posY - 12}
                        stroke="#34D399"
                        strokeWidth="1"
                      />
                      <circle cx={posX + 28} cy={posY - 12} r="2" fill="#34D399" />
                      <rect
                        x={posX + 32}
                        y={posY - 22}
                        width="96"
                        height="20"
                        rx="3"
                        fill="#151515"
                        stroke="#2A2A2A"
                        strokeWidth="1"
                      />
                      <text
                        x={posX + 38}
                        y={posY - 8}
                        fill="#FFF"
                        fontSize="9"
                        fontFamily="var(--font-mono)"
                        fontWeight="600"
                      >
                        {node.name.toUpperCase()}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Floating Quick Telemetry HUD Card in Corner */}
        <div className="absolute right-3 top-3 max-w-[220px] bg-white/95 backdrop-blur-md border border-neutral-200 rounded-xl p-3 shadow-lg">
          <div className="flex items-center justify-between text-[10px] font-clinical-mono text-neutral-600 mb-1.5 border-b border-neutral-200 pb-1">
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <Activity size={11} /> SELECTED JOINT
            </span>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-[9px] px-1.5 py-0.5 rounded-full font-semibold">
              IN-NETWORK
            </span>
          </div>

          <h4 className="font-editorial-serif text-sm font-bold text-neutral-900 leading-tight">
            {activeJointData.name}
          </h4>
          <p className="text-[10px] font-clinical-mono text-neutral-500 uppercase tracking-wide mt-0.5 font-medium">
            {activeJointData.anatomicalName}
          </p>

          <p className="text-[11px] text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
            {activeJointData.biomechanics}
          </p>

          <div className="mt-2.5 pt-2 border-t border-neutral-200 flex items-center justify-between">
            <span className="text-[10px] text-neutral-500 font-clinical-mono">
              Target: <span className="text-emerald-700 font-bold">94%</span>
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartAssessment(activeJointData.id);
              }}
              className="text-[11px] font-bold text-neutral-900 hover:text-emerald-700 flex items-center gap-1 group transition-colors cursor-pointer bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded-md"
            >
              Book Care <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>

        {/* Bottom center coordinates branding stamp */}
        <div className="absolute bottom-2 left-3 text-[9px] font-clinical-mono text-neutral-500 font-medium">
          KINETIC 3D MOTION LABS · Mumbai — Delhi — Bengaluru — London
        </div>
      </div>

      {/* Joint quick-pill selector row at base of visualizer */}
      <div className="px-3 py-2.5 bg-[#FAFAF8] border-t border-neutral-200 flex items-center justify-between gap-1 overflow-x-auto text-[11px]">
        <span className="text-neutral-500 font-clinical-mono text-[10px] uppercase font-bold shrink-0 pl-1">
          Select region:
        </span>
        <div className="flex items-center gap-1.5">
          {(['cervical', 'shoulder', 'spine', 'hip', 'knee', 'ankle'] as JointId[]).map((jointKey) => {
            const isSelected = selectedJoint === jointKey;
            const labelMap: Record<JointId, string> = {
              cervical: 'Neck',
              shoulder: 'Shoulder',
              spine: 'Spine',
              hip: 'Hip',
              knee: 'Knee',
              ankle: 'Ankle'
            };

            return (
              <button
                key={jointKey}
                onClick={() => onSelectJoint(jointKey)}
                className={`px-3 py-1 rounded-full text-xs font-editorial-sans transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#181816] text-[#F9F8F5] font-bold shadow-2xs border border-[#C59E5F]'
                    : 'bg-white text-[#5A5750] hover:text-[#181816] hover:bg-[#F9F8F5] border border-[#E5E1D8]'
                }`}
              >
                {labelMap[jointKey]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
