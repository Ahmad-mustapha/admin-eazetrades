// src/app/admin/advertisement/page.tsx
'use client';

import React, { useState, useCallback } from 'react';

// Ad Type
import AdTypeCard, { AdType } from '../../../component/adsandpromotion/adtypes/Adtype';
import EditAdTypePanel, { EditMode as AdTypeEditMode } from '../../../component/adsandpromotion/adtypes/EditAdTypesPanel';

// Promotion Power
import PromotionPowerCard, { PromotionPower }  from '../../../component/adsandpromotion/promotionpower/Promotionpower';
import EditPromotionPowerPanel, { EditMode as PromoPowerEditMode } from '../../../component/adsandpromotion/promotionpower/EditPromotionPowerPanel';

// Duration
import DurationCard, { DurationOption } from '../../../component/adsandpromotion/duration/Duration';
import EditDurationPanel, { EditMode as DurationEditMode } from '../../../component/adsandpromotion/duration/Editduration';

// === Import Ad Show Components ===
import EditAdShowPanel, { EditMode as AdShowEditMode } from '../../../component/adsandpromotion/adshow/Editadshow'; // Updated Import
import AdShowCard, { AdShowOption } from '../../../component/adsandpromotion/adshow/Adshow'; // Updated Import
// === End Import ===


// --- Updated ActivePanel Type ---
type PanelContextMap = {
  adType: { type: 'adType'; mode: AdTypeEditMode; item: AdType | null };
  promoPower: { type: 'promoPower'; mode: PromoPowerEditMode; item: PromotionPower | null };
  duration: { type: 'duration'; mode: DurationEditMode; item: DurationOption | null };
  adShow: { type: 'adShow'; mode: AdShowEditMode; item: AdShowOption | null }; // Added adShow
};
type PanelType = keyof PanelContextMap;
type ActivePanel = PanelContextMap[PanelType] | null;
// --- End Type Definitions ---


const Advertisement = () => {
  // --- State for Active Panel ---
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);

  // --- State for Refreshing Data ---
  const [adTypeRefreshKey, setAdTypeRefreshKey] = useState(0);
  const [promoPowerRefreshKey, setPromoPowerRefreshKey] = useState(0);
  const [durationRefreshKey, setDurationRefreshKey] = useState(0);
  const [adShowRefreshKey, setAdShowRefreshKey] = useState(0); // Added adShow key

  // --- Panel Control Handlers (Generic handler remains the same) ---
  const handleOpenPanel = useCallback(<T extends PanelType>(
    type: T,
    mode: PanelContextMap[T]['mode'],
    item: PanelContextMap[T]['item']
  ) => {
    console.log(`Opening panel: type=${type}, mode=${mode}, item=`, item);
    // This type assertion is necessary because TypeScript can't perfectly infer
    // the correlation between type, mode, and item within this generic function.
    setActivePanel({ type, mode, item } as ActivePanel);
  }, []);

  const handleClosePanel = useCallback(() => {
    console.log("Closing panel");
    setActivePanel(null);
  }, []);

  // --- Updated Save Success Handler ---
  const handleSaveSuccess = useCallback((savedType: PanelType) => {
    console.log(`${savedType} saved successfully, incrementing refresh key.`);
    if (savedType === 'adType') {
        setAdTypeRefreshKey(prevKey => prevKey + 1);
    } else if (savedType === 'promoPower') {
        setPromoPowerRefreshKey(prevKey => prevKey + 1);
    } else if (savedType === 'duration') {
        setDurationRefreshKey(prevKey => prevKey + 1);
    } else if (savedType === 'adShow') { // Added adShow case
        setAdShowRefreshKey(prevKey => prevKey + 1);
    }
  }, []);


  return (
    <div className="relative min-h-screen bg-gray-100">
        <div className="p-4 md:p-6 lg:p-8">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">Advertisement Settings</h1>

            {/* Using flex column for cards now */}
            <div className="flex flex-col space-y-6"> {/* Added space-y for gap */}
                {/* Ad Type Section */}
                <AdTypeCard
                    onAddRequest={() => handleOpenPanel('adType', 'add', null)}
                    onEditRequest={(item: AdType) => handleOpenPanel('adType', 'edit', item)}
                    refreshKey={adTypeRefreshKey}
                />

                 {/* Promotion Power Section */}
                 <PromotionPowerCard
                    onAddRequest={() => handleOpenPanel('promoPower', 'add', null)}
                    onEditRequest={(item: PromotionPower) => handleOpenPanel('promoPower', 'edit', item)}
                    refreshKey={promoPowerRefreshKey}
                 />

                 {/* Duration Section */}
                 <DurationCard
                    onAddRequest={() => handleOpenPanel('duration', 'add', null)}
                    onEditRequest={(item: DurationOption) => handleOpenPanel('duration', 'edit', item)}
                    refreshKey={durationRefreshKey}
                 />

                 {/* === Ad Show Section === */}
                 <AdShowCard
                    onAddRequest={() => handleOpenPanel('adShow', 'add', null)}
                    onEditRequest={(item: AdShowOption) => handleOpenPanel('adShow', 'edit', item)}
                    refreshKey={adShowRefreshKey}
                 />
                 {/* === End Ad Show Section === */}
             </div>

        </div>

        {/* Render Panels Conditionally */}
        <EditAdTypePanel
            isOpen={activePanel?.type === 'adType'}
            onClose={handleClosePanel}
            mode={activePanel?.type === 'adType' ? activePanel.mode : 'add'}
            initialData={activePanel?.type === 'adType' ? activePanel.item : null}
            onSaveSuccess={() => handleSaveSuccess('adType')}
        />
        <EditPromotionPowerPanel
            isOpen={activePanel?.type === 'promoPower'}
            onClose={handleClosePanel}
            mode={activePanel?.type === 'promoPower' ? activePanel.mode : 'add'}
            initialData={activePanel?.type === 'promoPower' ? activePanel.item : null}
            onSaveSuccess={() => handleSaveSuccess('promoPower')}
        />
        <EditDurationPanel
            isOpen={activePanel?.type === 'duration'}
            onClose={handleClosePanel}
            mode={activePanel?.type === 'duration' ? activePanel.mode : 'add'}
            initialData={activePanel?.type === 'duration' ? activePanel.item : null}
            onSaveSuccess={() => handleSaveSuccess('duration')}
        />
        {/* === Ad Show Panel === */}
        <EditAdShowPanel
            isOpen={activePanel?.type === 'adShow'}
            onClose={handleClosePanel}
            mode={activePanel?.type === 'adShow' ? activePanel.mode : 'add'}
            initialData={activePanel?.type === 'adShow' ? activePanel.item : null}
            onSaveSuccess={() => handleSaveSuccess('adShow')}
        />
        {/* === End Ad Show Panel === */}

    </div>
  );
};

export default Advertisement;