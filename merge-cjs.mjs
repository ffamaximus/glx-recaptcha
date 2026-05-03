import { promises as fs } from 'fs';
import path from 'path';

const cjsDir = path.resolve(process.cwd(), 'dist-cjs');
const distDir = path.resolve(process.cwd(), 'dist');

async function mergeCjs() {
    try {
        await fs.access(cjsDir).catch(() => {
            console.warn(`Directory ${cjsDir} does not exist. Skipping merge.`);
            return;
        });

        const files = await fs.readdir(cjsDir);

        for (const file of files) {
            if (file.endsWith('.js')) {
                const oldPath = path.join(cjsDir, file);
                const newPath = path.join(distDir, file.replace(/\.js$/, '.cjs'));
                
                // Move to dist folder and rename to .cjs
                await fs.rename(oldPath, newPath);
                console.log(`Merged ${file} into dist as ${path.basename(newPath)}`);
            }
        }

        // Clean up temporary build folder
        await fs.rm(cjsDir, { recursive: true, force: true });
        console.log('Build process completed successfully.');
    } catch (error) {
        console.error('Error processing CJS files:', error);
        process.exit(1);
    }
}

mergeCjs();
