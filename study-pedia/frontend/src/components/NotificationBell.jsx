import React, { useState } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

const NotificationBell = () => {
  const { notifications, deleteNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const getTypeIcon = (type) => {
    switch(type) {
      case 'urgent': return '🔴';
      case 'exam': return '📝';
      case 'holiday': return '🎉';
      case 'important': return '⚠️';
      default: return '📢';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'urgent': return 'URGENT';
      case 'exam': return 'EXAM';
      case 'holiday': return 'HOLIDAY';
      case 'important': return 'IMPORTANT';
      default: return 'GENERAL';
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1.3rem',
          cursor: 'pointer',
          position: 'relative',
          padding: '5px 10px'
        }}
      >
        🔔
        {notifications.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: '#dc3545',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '10px',
            fontWeight: 'bold'
          }}>
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998
            }}
            onClick={() => setIsOpen(false)}
          />
          <div style={{
            position: 'absolute',
            top: '40px',
            right: '0',
            width: '380px',
            maxHeight: '500px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
            zIndex: 999,
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '15px',
              background: '#1e3c72',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h4 style={{ margin: 0 }}>📢 Memos & Notices</h4>
              <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '10px' }}>
                {notifications.length} total
              </span>
            </div>
            
            <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
              {notifications.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                  🔔 No memos yet
                </div>
              ) : (
                notifications.map(notif => (
                  <div
                    key={notif.id}
                    style={{
                      padding: '15px',
                      borderBottom: '1px solid #eee',
                      background: '#fff',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ fontSize: '24px' }}>{getTypeIcon(notif.type)}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                          <span style={{ 
                            fontSize: '12px', 
                            background: getTypeIcon(notif.type) === '🔴' ? '#dc3545' : 
                                       getTypeIcon(notif.type) === '📝' ? '#ff6b35' :
                                       getTypeIcon(notif.type) === '🎉' ? '#28a745' : '#ffc107',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '4px'
                          }}>
                            {getTypeLabel(notif.type)}
                          </span>
                          <button
                            onClick={() => deleteNotification(notif.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#999',
                              fontSize: '16px'
                            }}
                          >
                            ✕
                          </button>
                        </div>
                        <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px' }}>
                          {notif.title}
                        </div>
                        <div style={{ fontSize: '14px', color: '#555', marginBottom: '8px' }}>
                          {notif.message}
                        </div>
                        <div style={{ fontSize: '11px', color: '#999' }}>
                          📅 {notif.date} | 🕐 {notif.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;