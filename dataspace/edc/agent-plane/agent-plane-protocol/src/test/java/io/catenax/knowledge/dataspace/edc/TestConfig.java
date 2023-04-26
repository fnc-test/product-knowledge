//
// EDC Data Plane Agent Extension Test
// See copyright notice in the top folder
// See authors file in the top folder
// See license file in the top folder
//
package io.catenax.knowledge.dataspace.edc;

import org.eclipse.edc.spi.system.configuration.ConfigImpl;
import java.util.Map;

/**
 * test config impl
 */
public class TestConfig extends ConfigImpl {

    public TestConfig() {
        super("edc", Map.of("edc.cx.agent.controlplane.ids","test-tenant"));
    }
    
}
