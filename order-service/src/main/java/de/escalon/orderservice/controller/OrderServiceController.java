package de.escalon.orderservice.controller;

import de.escalon.orderservice.model.Order;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resources;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RestController
@RequestMapping("/orders")
public class OrderServiceController {

    AtomicLong counter = new AtomicLong();
    MultiValueMap<String, String> orders = new LinkedMultiValueMap<>();

    @RequestMapping(value = "/{orderId}", method = RequestMethod.GET)
    public ResponseEntity<Resources<String>> getOrders(@PathVariable String orderId) {
        List<String> orders = this.orders.get(orderId);
        Resources<String> body = new Resources<>(orders);
        body.add(linkTo(methodOn(this.getClass()).getOrders(orderId)).withSelfRel());
        return ResponseEntity.ok(body);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Void> createOrder(@RequestBody List<String> item) {
        UUID uuid = UUID.randomUUID();
        String key = uuid.toString();
        orders.put(key, item);
        Link link = linkTo(methodOn(this.getClass()).getOrders(key)).withSelfRel();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.LOCATION, link.getHref());
        return new ResponseEntity<Void>(headers, HttpStatus.FOUND);
    }

    @RequestMapping(value = "/{orderId}", method = RequestMethod.POST)
    public ResponseEntity<Void> appendToOrder(@PathVariable String orderId, @RequestBody List<String> item) {
        List<String> strings = orders.get(orderId);
        strings.addAll(item);
        orders.put(orderId, strings);
        Link link = linkTo(methodOn(this.getClass()).getOrders(orderId)).withSelfRel();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.LOCATION, link.getHref());
        return new ResponseEntity<Void>(headers, HttpStatus.FOUND);
    }



}
