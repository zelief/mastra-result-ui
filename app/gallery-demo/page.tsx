"use client";

import { useState } from "react";
import { ImageGallery } from "@/components/image-gallery";


const sampleUrls = `https://cbu01.alicdn.com/O1CN01JOyWVG25R8BumbClD_!!2200812377522-0-cib.jpg
https://cbu01.alicdn.com/O1CN01YExKvx2HrwlsQw6Us_!!2208022379205-0-cib.jpg
https://cbu01.alicdn.com/O1CN01KE7eLd1X2DoZmNx1j_!!2220248932865-0-cib.jpg
https://cbu01.alicdn.com/O1CN01Usar5P1KXjy85B4Tt_!!2201223191174-0-cib.jpg
https://cbu01.alicdn.com/O1CN01Ato0q31qcNjhCAham_!!2219438855516-0-cib.jpg
https://cbu01.alicdn.com/O1CN01lXEorL1mWeGNyITKI_!!2207270434962-0-cib.jpg
https://cbu01.alicdn.com/O1CN01Nf0ZH41gBE2k198cH_!!2217157444103-0-cib.jpg
https://cbu01.alicdn.com/O1CN017j886f2C32jUFpiNo_!!2219458398417-0-cib.jpg
https://cbu01.alicdn.com/O1CN01rHpeCk1DgiPtZRhJB_!!2217495140246-0-cib.jpg
https://cbu01.alicdn.com/O1CN01vctg851QI46VTpy6u_!!2217137381952-0-cib.jpg
https://cbu01.alicdn.com/O1CN01SCA9td1HBLo8IIeHJ_!!2219436090719-0-cib.jpg`;

export default function GalleryDemoPage() {
    const [urls, setUrls] = useState(sampleUrls);
    const [threshold, setThreshold] = useState(0.6);
    const [duplicateGroups, setDuplicateGroups] = useState<string[][]>([]);
    const [loading, setLoading] = useState(false);

    const findDuplicates = async () => {
        setLoading(true);
        try {
            const urlArray = urls.split('\n').filter(url => url.trim());
            const response = await fetch(`${process.env.NEXT_PUBLIC_MASTRA_API_URL}/api/tools/find-image-duplicates/execute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: { urls: urlArray, threshold }
                })
            });
            const result = await response.json();
            setDuplicateGroups(result.duplicates || []);
        } catch (error) {
            console.error('Error finding duplicates:', error);
        }
        setLoading(false);
    };

    const currentImages = urls.split('\n').filter(url => url.trim());

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Image Duplicate Finder</h1>
                    <p className="text-muted-foreground">
                        Find duplicate images using AI similarity detection
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Image URLs (one per line):</label>
                            <textarea 
                                value={urls} 
                                onChange={(e) => setUrls(e.target.value)}
                                rows={8}
                                className="w-full p-3 border rounded-lg"
                                placeholder="Enter image URLs..."
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Threshold (0-1):</label>
                            <input 
                                type="number" 
                                min="0" 
                                max="1" 
                                step="0.1"
                                value={threshold}
                                onChange={(e) => setThreshold(Number(e.target.value))}
                                className="w-32 p-2 border rounded"
                            />
                        </div>
                        <button 
                            onClick={findDuplicates}
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Finding...' : 'Find Duplicates'}
                        </button>
                    </div>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">Current Images ({currentImages.length})</h2>
                        <ImageGallery images={currentImages} />
                    </section>

                    {duplicateGroups.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Duplicate Groups ({duplicateGroups.length})</h2>
                            {duplicateGroups.map((group, index) => (
                                <div key={index} className="mb-6">
                                    <h3 className="text-lg font-medium mb-2">Group {index + 1} ({group.length} images)</h3>
                                    <ImageGallery images={group} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
