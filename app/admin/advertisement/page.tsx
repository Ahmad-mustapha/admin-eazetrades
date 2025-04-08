// src/app/admin/advertisement/page.tsx
'use client';

import React, { useState, useCallback } from 'react';

// Ad Type components & types
import AdTypeCard, { AdType } from '../../../component/adsandpromotion/adtypes/Adtype';
import EditAdTypePanel, { EditMode as AdTypeEditMode } from '../../../component/adsandpromotion/adtypes/EditAdTypesPanel';

// Promotion Power components & types
import EditPromotionPowerPanel, { EditMode as PromoPowerEditMode } from '../../../component/adsandpromotion/promotionpower/EditPromotionPowerPanel';
import PromotionPowerCard, { PromotionPower }  from '../../../component/adsandpromotion/promotionpower/Promotionpower';


// --- Define a more structured type for panel context ---
// This maps the 'type' string to the specific data item and edit mode type
type PanelContextMap = {
  adType: { type: 'adType'; mode: AdTypeEditMode; item: AdType | null };
  promoPower: { type: 'promoPower'; mode: PromoPowerEditMode; item: PromotionPower | null };
  // Add entries for duration, audience etc. when needed
  // duration: { type: 'duration'; mode: SomeEditMode; item: DurationOption | null };
};

// Extract the possible string types ('adType', 'promoPower')
type PanelType = keyof PanelContextMap;

// The activePanel state can be one of the value types from the map, or null
type ActivePanel = PanelContextMap[PanelType] | null;
// --- End Type Definitions ---


const Advertisement = () => {
  // --- State for Active Panel (Uses the new ActivePanel type) ---
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);

  // --- State for Refreshing Data ---
  const [adTypeRefreshKey, setAdTypeRefreshKey] = useState(0);
  const [promoPowerRefreshKey, setPromoPowerRefreshKey] = useState(0);
  // Add more refresh keys...

  // --- Corrected Panel Control Handlers ---
  // Use generics to strongly type the relationship between type string and item/mode
  const handleOpenPanel = useCallback(<T extends PanelType>(
    type: T,                                  // Type is one of 'adType', 'promoPower'
    mode: PanelContextMap[T]['mode'],         // Mode type depends on T
    item: PanelContextMap[T]['item']          // Item type depends on T
  ) => {
    console.log(`Opening panel: type=${type}, mode=${mode}, item=`, item);
    // Construct the state object matching the ActivePanel type union
    setActivePanel({ type, mode, item } as ActivePanel); // Use assertion to fit union type
  }, []); // No dependencies needed

  const handleClosePanel = useCallback(() => {
    console.log("Closing panel");
    setActivePanel(null);
  }, []);

  // --- Save Success Handler ---
  const handleSaveSuccess = useCallback((savedType: PanelType) => { // Use PanelType
    console.log(`${savedType} saved successfully, incrementing refresh key.`);
    if (savedType === 'adType') {
        setAdTypeRefreshKey(prevKey => prevKey + 1);
    } else if (savedType === 'promoPower') {
        setPromoPowerRefreshKey(prevKey => prevKey + 1);
    }
    // Add else if for other types...
  }, []);


  return (
    <div className="relative min-h-screen bg-gray-100">
        <div className="p-4 md:p-6 lg:p-8">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">Advertisement Settings</h1>

             {/* Ad Type Section - Ensure types passed match handleOpenPanel */}
            <AdTypeCard
                onAddRequest={() => handleOpenPanel('adType', 'add', null)}
                onEditRequest={(item: AdType) => handleOpenPanel('adType', 'edit', item)}
                refreshKey={adTypeRefreshKey}
            />

             {/* Promotion Power Section - Ensure types passed match handleOpenPanel */}
             <PromotionPowerCard
                onAddRequest={() => handleOpenPanel('promoPower', 'add', null)}
                onEditRequest={(item: PromotionPower) => handleOpenPanel('promoPower', 'edit', item)}
                refreshKey={promoPowerRefreshKey}
             />

            {/* --- Placeholder for other sections --- */}

        </div>

        {/* Render the Correct Side Panel Conditionally */}
        {/* AdType Panel */}
        <EditAdTypePanel
            isOpen={activePanel?.type === 'adType'}
            onClose={handleClosePanel}
            mode={activePanel?.type === 'adType' ? activePanel.mode : 'add'}
            initialData={activePanel?.type === 'adType' ? activePanel.item : null}
            onSaveSuccess={() => handleSaveSuccess('adType')} // Pass the correct type string
        />

        {/* Promotion Power Panel */}
        <EditPromotionPowerPanel
            isOpen={activePanel?.type === 'promoPower'}
            onClose={handleClosePanel}
            mode={activePanel?.type === 'promoPower' ? activePanel.mode : 'add'}
            initialData={activePanel?.type === 'promoPower' ? activePanel.item : null}
            onSaveSuccess={() => handleSaveSuccess('promoPower')} // Pass the correct type string
        />

        {/* Add panels for Duration, Audience etc. here */}

    </div>
  );
};

export default Advertisement;