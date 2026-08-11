import React from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useWidgetStore, WidgetState } from '../stores/widgetStore';

import { ClockWidget } from '../widgets/ClockWidget';
import { CalendarWidget } from '../widgets/CalendarWidget';
import { WeatherWidget } from '../widgets/WeatherWidget';
import { NotesWidget } from '../widgets/NotesWidget';
import { MusicWidget } from '../widgets/MusicWidget';
import { QuickActionsWidget } from '../widgets/QuickActionsWidget';

const WidgetWrapper: React.FC<{ widget: WidgetState }> = ({ widget }) => {
  const { updatePosition } = useWidgetStore();
  const dragControls = useDragControls();

  const renderWidget = () => {
    switch (widget.type) {
      case 'clock': return <ClockWidget />;
      case 'calendar': return <CalendarWidget />;
      case 'weather': return <WeatherWidget />;
      case 'notes': return <NotesWidget />;
      case 'music': return <MusicWidget />;
      case 'quickactions': return <QuickActionsWidget />;
      default: return null;
    }
  };

  return (
    <motion.div
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      initial={{ x: widget.position.x, y: widget.position.y }}
      onDragEnd={(_e, info) => {
        // Persist new position
        updatePosition(widget.id, {
          x: widget.position.x + info.offset.x,
          y: widget.position.y + info.offset.y
        });
      }}
      className="absolute z-0 pointer-events-auto"
      style={{
        left: widget.position.x, // Initial placement, framer handles delta
        top: widget.position.y
      }}
    >
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="cursor-grab active:cursor-grabbing"
      >
        {renderWidget()}
      </div>
    </motion.div>
  );
};

export const WidgetLayer: React.FC = () => {
  const widgets = useWidgetStore(state => state.widgets);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {widgets.map(widget => (
        <WidgetWrapper key={widget.id} widget={widget} />
      ))}
    </div>
  );
};
