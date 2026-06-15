import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, incidentType, severity } = body;

    // On envoie l'ordre au serveur Standalone (Fastify)
    const response = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/admin/incident`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        incident: {
          id: Math.random().toString(36).substr(2, 9),
          type: incidentType,
          severity: severity || 'MEDIUM',
          messageKey: `incident_${incidentType.toLowerCase()}`
        }
      }),
    });

    if (!response.ok) throw new Error('Failed to notify Game Server');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
