
// https://www.npmjs.com/package/nodejs-license-file

const licenseFile = require('nodejs-license-file');

const template = [
    '====BEGIN LICENSE====',
    '{{&licenseVersion}}',
    '{{&applicationVersion}}',
    '{{&firstName}}',
    '{{&lastName}}',
    '{{&email}}',
    '{{&expirationDate}}',
    '{{d&serial}}',
    '=====END LICENSE====='
].join('\n');

try {

    const licenseFileContent = licenseFile.generate({
        privateKeyPath: './private_key.pem',
        template,
        data: {
            licenseVersion: '1',
            applicationVersion: '1.0.0',
            firstName: 'afts',
            lastName: 'system',
            email: 'sriharsha2013@gmail.com',
            expirationDate: '12/10/2025'
        }
    });

    console.log("licence content ", licenseFileContent);

} catch (err) {

    console.log(" content erro ", err);
}



// Extract  the .pem file 


try {

    const data = licenseFile.parse({
        publicKeyPath: './public_key.pem',
        template
    });

    console.log("success", data);

} catch (err) {

    console.log("errr", err);
}