package test.backend.Test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController 
@RequestMapping("/message")
@CrossOrigin (origins = "http://localhost:5173")
public class TestController {

    @GetMapping("/")
    public Map<String, String> getMessage(){
        return Map.of("message" , "Maliga");
    }
}
