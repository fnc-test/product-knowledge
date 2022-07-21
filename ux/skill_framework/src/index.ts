//
// Main logic of the skill framework
// See copyright notice in the top folder
// See authors file in the top folder
// See license file in the top folder
//

// issue a module loading message
console.log("Debug: Loading skill_framework/index");

/**
 * the standard connector url is taken from
 * the environment or set to localhost
 */
const SKILL_CONNECTOR = process.env.SKILL_CONNECTOR ?? "http://localhost:8080";

/**
 * A function to list all graph assets.
 * The function will use the control plane of the preconfigured SKILL_CONNECTOR
 * @param providerUrl optional connector url of the provider (use the SKILL_CONNECTOR itself as the default)
 * @returns a list of graph assets
 */
export function listAssets(providerUrl?: string): any[] {
    return [
            {
                "id": "contract-readall:6854d537-c810-49c0-85e6-df038257d90c",
                "policy": {
                    "uid": "f0930399-72da-4d64-82e1-e7df015de403",
                    "permissions": [
                        {
                            "edctype": "dataspaceconnector:permission",
                            "uid": null,
                            "target": "offer-code",
                            "action": {
                                "type": "USE",
                                "includedIn": null,
                                "constraint": null
                            },
                            "assignee": null,
                            "assigner": null,
                            "constraints": [],
                            "duties": []
                        }
                    ],
                    "prohibitions": [],
                    "obligations": [],
                    "extensibleProperties": {},
                    "inheritsFrom": null,
                    "assigner": null,
                    "assignee": null,
                    "target": null,
                    "@type": {
                        "@policytype": "set"
                    }
                },
                "asset": {
                    "properties": {
                        "asset:prop:name": "Tenant Offer of Certificates of Destruction.",
                        "asset:prop:contenttype": "application/json",
                        "ids:byteSize": null,
                        "asset:prop:policy-id": "use-eu",
                        "asset:prop:id": "offer-code",
                        "ids:fileName": null
                    }
                },
                "policyId": null,
                "assetId": null,
                "provider": "urn:connector:provider",
                "consumer": "urn:connector:consumer",
                "offerStart": null,
                "offerEnd": null,
                "contractStart": null,
                "contractEnd": null
            }
        ];
}