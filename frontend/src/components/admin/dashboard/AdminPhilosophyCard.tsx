'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PhilosophyPillar, Architect, Material } from '@/data/philosophy';
import { Palette } from 'lucide-react';

interface AdminPhilosophyCardProps {
  pillars: PhilosophyPillar[];
  architects: Architect[];
  materials: Material[];
}

export default function AdminPhilosophyCard({
  pillars,
  architects,
  materials,
}: AdminPhilosophyCardProps) {
  const [activeTab, setActiveTab] = useState<'pillars' | 'architects' | 'materials'>('pillars');

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-black/8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] border border-[#b8864a]/30 flex items-center justify-center text-[#8c5a1e]">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-[#121212]">Triết Lý & Chế Tác</h3>
            <p className="text-xs text-[#737373]">Dữ liệu từ philosophy.ts</p>
          </div>
        </div>
      </div>

      {/* Subtabs */}
      <div className="flex items-center gap-1 p-1 bg-[#FAF7F2] rounded-xl border border-black/5 text-[11px] font-semibold">
        <button
          onClick={() => setActiveTab('pillars')}
          className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
            activeTab === 'pillars' ? 'bg-[#121212] text-white' : 'text-[#666]'
          }`}
        >
          4 Trụ Cột
        </button>
        <button
          onClick={() => setActiveTab('architects')}
          className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
            activeTab === 'architects' ? 'bg-[#121212] text-white' : 'text-[#666]'
          }`}
        >
          3 KTS Trưởng
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
            activeTab === 'materials' ? 'bg-[#121212] text-white' : 'text-[#666]'
          }`}
        >
          Vật Liệu
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3 text-xs max-h-56 overflow-y-auto scrollbar-none pt-1">
        {activeTab === 'pillars' &&
          pillars.map((pil) => {
            const Icon = pil.icon;
            return (
              <div key={pil.tag} className="p-2.5 rounded-xl bg-[#FAF7F2]/60 border border-black/5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#121212]">
                  <Icon className="w-3.5 h-3.5 text-[#8c5a1e] shrink-0" />
                  <span className="truncate">{pil.title}</span>
                </div>
                <p className="text-[11px] text-[#666] line-clamp-2">{pil.description}</p>
              </div>
            );
          })}

        {activeTab === 'architects' &&
          architects.map((arch) => (
            <div key={arch.name} className="flex items-center gap-3 p-2 rounded-xl bg-[#FAF7F2]/60 border border-black/5">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#b8864a]/30">
                <Image src={arch.avatar} alt={arch.name} fill sizes="40px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[#121212] truncate">{arch.name}</p>
                <p className="text-[10px] text-[#8c5a1e] truncate">{arch.role}</p>
                <p className="text-[10px] text-[#737373] truncate mt-0.5">{arch.experience}</p>
              </div>
            </div>
          ))}

        {activeTab === 'materials' &&
          materials.map((mat) => (
            <div key={mat.name} className="flex items-center gap-3 p-2 rounded-xl bg-[#FAF7F2]/60 border border-black/5">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-black/10">
                <Image src={mat.image} alt={mat.name} fill sizes="44px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[#121212] truncate">{mat.name}</p>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#b8864a]/10 text-[#8c5a1e] font-semibold">
                  {mat.origin}
                </span>
                <p className="text-[10px] text-[#666] line-clamp-1 mt-0.5">{mat.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
