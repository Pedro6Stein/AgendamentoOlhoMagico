package olhomagico.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private static final String CPF_ADMIN_MESTRE = "00000000858"; 

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData) {
        String cpfRecebido = loginData.get("cpf");

        if (CPF_ADMIN_MESTRE.equals(cpfRecebido)) {
           
            String token = java.util.UUID.randomUUID().toString();
            
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}