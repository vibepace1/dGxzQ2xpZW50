import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class TlsDependency {
    constructor() {
        this.arch = os.arch();
        this.platform = os.platform();
        this.version = '1.8.0';
        this.filename = 'tls-client-xgo';
        this.extension = '';
        this.distribution = '';
        this.setDetails();
    }

    setDetails() {
        if (this.platform === 'win32') {
            this.extension = 'dll';
            this.distribution = this.arch.includes('64') ? 'windows-amd64' : 'windows-386';
        } else if (this.platform === 'darwin') {
            this.extension = 'dylib';
            this.distribution = this.arch == 'arm64' ? 'darwin-arm64' : 'darwin-amd64';
        } else if (this.platform === 'linux') {
            this.extension = 'so';
            const archMap = {
                arm64: 'linux-arm64',
                x64: 'linux-amd64',
                ia32: 'linux-386',
                arm: 'linux-arm-7',
                ppc64: 'linux-ppc64le',
                riscv64: 'linux-riscv64',
                s390x: 'linux-s390x',
            };
            this.distribution = archMap[this.arch] || 'linux-amd64';
        } else {
            console.error(`Unsupported platform: ${this.platform}`);
            process.exit(1);
        }
    }

    getTLSDependencyPath(customPath = null) {
        let _filename = `${this.filename}-${this.version}-${this.distribution}.${this.extension}`;
        
        const projectRoot = path.resolve(__dirname, '../../');
        const libPath = path.join(projectRoot, 'lib', _filename);
        
        return {
            DOWNLOAD_PATH: '',
            TLS_LIB_PATH: libPath,
        };
    }
}

export default TlsDependency;
